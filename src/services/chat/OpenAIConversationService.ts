import type { IChatService, ChatServicePayload, ChatServiceResponse } from './IChatService';

/**
 * Implementação do serviço de chat usando a **Responses API** da OpenAI.
 *
 * As requisições passam pelo proxy server-side (/openai-api), garantindo que
 * a API key nunca chega ao bundle do browser.
 *
 * Usa `previous_response_id` para manter continuidade de conversa — sem
 * necessidade de armazenar o histórico completo no client.
 */
export class OpenAIConversationService implements IChatService {
  private readonly conversationId: string;

  /** ID da última resposta — usado para encadear turnos. */
  private previousResponseId: string | null = null;

  constructor() {
    this.conversationId = `openai-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  async sendMessage(payload: ChatServicePayload): Promise<ChatServiceResponse> {
    const body: Record<string, unknown> = {
      model: __CHATKIT_MODEL__,
      input: payload.message,
      store: true,
    };

    // Instruções do agente (configuráveis via env var)
    const instructions = __CHATKIT_INSTRUCTIONS__;
    if (instructions) {
      body.instructions = instructions;
    }

    // Encadeia com a resposta anterior para manter contexto
    if (this.previousResponseId) {
      body.previous_response_id = this.previousResponseId;
    }

    const response = await fetch('/openai-api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Erro na API OpenAI (${response.status}): ${errorBody}`);
    }

    const data = await response.json();

    // Salva o ID para o próximo turno
    this.previousResponseId = data.id ?? null;

    // Extrai o texto da resposta
    const text =
      data.output_text ??
      data.output?.[0]?.content?.[0]?.text ??
      'Não consegui gerar uma resposta. Tente novamente.';

    return { text, conversationId: this.conversationId };
  }
}
