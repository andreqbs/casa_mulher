import type { ChatServicePayload, ChatServiceResponse } from './IChatService';
import type {
  IStreamingChatService,
  StreamingCallbacks,
} from './IStreamingChatService';
import { debug } from '@/src/utils/debugLogger';

/**
 * Resposta bruta da Responses API da OpenAI (subset relevante).
 */
interface OpenAIResponse {
  id: string;
  output_text?: string;
  output?: Array<{
    content?: Array<{ type: string; text?: string }>;
  }>;
}

/**
 * Evento SSE emitido durante o streaming da Responses API.
 */
interface SSEEvent {
  type: string;
  delta?: string;
  response?: OpenAIResponse;
  message?: string;
  // output_index / content_index presentes em output_text.delta mas não usados
}

/**
 * Implementação nativa da Responses API da OpenAI com suporte a SSE streaming.
 *
 * Comunicação direta com o Agent Builder sem depender do ChatKit ou de qualquer
 * biblioteca de terceiros para o protocolo de transporte.
 *
 * SOLID:
 *   - Single Responsibility: apenas transporte HTTP + parse de SSE.
 *   - Open/Closed: extensível via IStreamingChatService sem alterar IChatService.
 *   - Liskov Substitution: substitui IChatService em qualquer consumidor existente.
 *   - Interface Segregation: implementa IStreamingChatService que estende IChatService.
 *   - Dependency Inversion: depende apenas das interfaces e das constantes de build.
 *
 * GRASP:
 *   - Information Expert: responsável por todo o conhecimento sobre o protocolo SSE
 *     e o ciclo de vida de respostas da OpenAI.
 *   - Low Coupling: não depende de nenhum estado externo além das build-time consts.
 *   - High Cohesion: todas as responsabilidades são relacionadas ao transporte HTTP.
 */
export class OpenAINativeChatService implements IStreamingChatService {
  /** ID único da conversa — exposto para rastreamento no store. */
  private readonly conversationId: string;

  /**
   * ID da última resposta gerada.
   * Encadeado via `previous_response_id` para manter o contexto da conversa
   * sem armazenar o histórico completo no cliente.
   */
  private previousResponseId: string | null = null;

  constructor() {
    this.conversationId = `openai-native-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  // ── IChatService (modo batch, sem streaming) ─────────────────────────────

  /**
   * Envio síncrono de uma mensagem — acumula os deltas internamente e
   * retorna o texto completo. Útil para consumidores que não precisam
   * de streaming (e.g. testes, stores genéricos).
   */
  async sendMessage(payload: ChatServicePayload): Promise<ChatServiceResponse> {
    let fullText = '';
    let resolvedConversationId = this.conversationId;

    await this.sendMessageStream(payload, {
      onDelta: (delta) => {
        fullText += delta;
      },
      onComplete: (text, convId) => {
        fullText = text;
        resolvedConversationId = convId;
      },
      onError: (error) => {
        throw error;
      },
    });

    return { text: fullText, conversationId: resolvedConversationId };
  }

  // ── IStreamingChatService ────────────────────────────────────────────────

  /**
   * Envia a mensagem e entrega a resposta em fragmentos via SSE.
   *
   * Protocolo:
   *   POST /openai-api/responses  (proxy → https://api.openai.com/v1/responses)
   *   stream: true                → Server-Sent Events
   *   previous_response_id        → continuidade da conversa
   *
   * Eventos SSE relevantes:
   *   response.created            → resposta iniciada (sem texto ainda)
   *   response.output_text.delta  → fragmento de texto
   *   response.completed          → resposta completa; contém o response.id
   *   error                       → erro da API
   */
  async sendMessageStream(
    payload: ChatServicePayload,
    callbacks: StreamingCallbacks,
  ): Promise<void> {
    const requestBody = this.buildRequestBody(payload.message);

    debug.log(
      '[OpenAINative] Enviando mensagem | sessionId:',
      payload.sessionId,
      '| previousResponseId:',
      this.previousResponseId ?? 'nenhum',
    );

    let response: Response;
    try {
      response = await fetch('/openai-api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
    } catch (networkError) {
      const error = new Error(
        `Falha de rede ao conectar com a API OpenAI: ${String(networkError)}`,
      );
      debug.error('[OpenAINative] Erro de rede:', networkError);
      callbacks.onError(error);
      return;
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '(sem corpo)');
      const error = new Error(
        `OpenAI API respondeu com erro ${response.status}: ${errorBody}`,
      );
      debug.error('[OpenAINative] HTTP error:', response.status, errorBody);
      callbacks.onError(error);
      return;
    }

    if (!response.body) {
      callbacks.onError(new Error('A resposta da API não contém corpo (ReadableStream ausente).'));
      return;
    }

    await this.consumeSSEStream(response.body, callbacks);
  }

  // ── Métodos privados ─────────────────────────────────────────────────────

  /**
   * Monta o corpo da requisição para a Responses API.
   * Centraliza a lógica de montagem — Single Responsibility.
   *
   * NOTA IMPORTANTE:
   *   A Responses API (`/v1/responses`) aceita apenas nomes de modelos no campo
   *   `model` (ex: "gpt-4o", "gpt-4o-mini"). Workflow IDs do Agent Builder
   *   (`wf_...`) NÃO são suportados aqui — eles pertencem ao protocolo ChatKit.
   *   Para invocar um workflow do Agent Builder a partir do browser, é necessário
   *   usar o endpoint `/v1/chatkit/sessions` com a biblioteca `@openai/chatkit-react`
   *   (provider `chatkit`).
   *
   *   Este provider (`openai-native`) se comunica diretamente com o modelo via
   *   Responses API + SSE, sem depender do ChatKit. Configure o comportamento
   *   do agente via `OPENAI_NATIVE_INSTRUCTIONS` no `.env`.
   */
  private buildRequestBody(message: string): Record<string, unknown> {
    const body: Record<string, unknown> = {
      model: __OPENAI_NATIVE_MODEL__,
      input: message,
      store: true,
      stream: true,
    };

    const instructions = __OPENAI_NATIVE_INSTRUCTIONS__;
    if (instructions) {
      body.instructions = instructions;
    }

    if (this.previousResponseId) {
      body.previous_response_id = this.previousResponseId;
    }

    debug.log('[OpenAINative] Modelo:', __OPENAI_NATIVE_MODEL__);

    return body;
  }

  /**
   * Lê o ReadableStream de SSE e dispara os callbacks para cada evento relevante.
   *
   * Formato SSE:
   *   data: <JSON>\n\n
   *   data: [DONE]\n\n
   */
  private async consumeSSEStream(
    body: ReadableStream<Uint8Array>,
    callbacks: StreamingCallbacks,
  ): Promise<void> {
    const reader = body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let fullText = '';
    let started = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        // A última linha pode estar incompleta — mantém no buffer
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith('data:')) continue;

          const payload = trimmed.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;

          const event = this.parseSSEEvent(payload);
          if (!event) continue;

          switch (event.type) {
            case 'response.created':
              if (!started) {
                started = true;
                callbacks.onStart?.();
                debug.log('[OpenAINative] Streaming iniciado');
              }
              break;

            case 'response.output_text.delta': {
              const delta = event.delta ?? '';
              if (delta) {
                if (!started) {
                  started = true;
                  callbacks.onStart?.();
                }
                fullText += delta;
                callbacks.onDelta(delta);
              }
              break;
            }

            case 'response.completed': {
              const responseId = event.response?.id ?? null;
              if (responseId) {
                this.previousResponseId = responseId;
                debug.log('[OpenAINative] Response ID armazenado:', responseId);
              }
              // Garante que temos o texto completo (fallback para campos alternativos)
              const finalText =
                fullText ||
                event.response?.output_text ||
                this.extractTextFromOutput(event.response?.output) ||
                '';
              debug.log(
                '[OpenAINative] Streaming completo | chars:',
                finalText.length,
              );
              callbacks.onComplete(finalText, this.conversationId);
              return;
            }

            case 'error': {
              const message = event.message ?? 'Erro desconhecido no streaming';
              debug.error('[OpenAINative] Erro SSE:', message);
              callbacks.onError(new Error(message));
              return;
            }
          }
        }
      }
    } catch (readError) {
      const error =
        readError instanceof Error
          ? readError
          : new Error(String(readError));
      debug.error('[OpenAINative] Erro ao ler stream:', error);
      callbacks.onError(error);
      return;
    } finally {
      reader.releaseLock();
    }

    // Stream terminou sem evento `response.completed` — entrega o que tiver
    if (fullText) {
      debug.log('[OpenAINative] Stream encerrado sem response.completed — usando texto acumulado');
      callbacks.onComplete(fullText, this.conversationId);
    } else {
      callbacks.onError(new Error('Resposta vazia recebida da API.'));
    }
  }

  /** Faz o parse seguro de uma linha SSE. Retorna null se inválida. */
  private parseSSEEvent(data: string): SSEEvent | null {
    try {
      return JSON.parse(data) as SSEEvent;
    } catch {
      debug.log('[OpenAINative] Linha SSE ignorada (JSON inválido):', data.slice(0, 80));
      return null;
    }
  }

  /** Fallback para extrair texto do array `output` de uma resposta completa. */
  private extractTextFromOutput(
    output?: OpenAIResponse['output'],
  ): string {
    if (!Array.isArray(output)) return '';
    return output
      .flatMap((item) => item.content ?? [])
      .filter((c) => c.type === 'output_text' && c.text)
      .map((c) => c.text!)
      .join('');
  }
}
