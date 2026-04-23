import type { IChatService, ChatServicePayload } from './IChatService';

/**
 * Callbacks para o modo streaming de respostas via SSE.
 *
 * GRASP – Controller / Information Expert:
 *   O chamador define o comportamento para cada evento do ciclo de vida
 *   do streaming, sem acoplar a lógica de exibição à lógica de transporte.
 */
export interface StreamingCallbacks {
  /** Disparado quando a API confirma o início da geração. */
  onStart?: () => void;

  /** Disparado para cada fragmento (delta) de texto gerado. */
  onDelta: (delta: string) => void;

  /** Disparado quando o texto completo é entregue. */
  onComplete: (fullText: string, conversationId: string) => void;

  /** Disparado em caso de erro durante o streaming. */
  onError: (error: Error) => void;
}

/**
 * Extensão de IChatService para provedores com suporte a streaming real-time.
 *
 * SOLID – Interface Segregation Principle:
 *   Provedores que não suportam streaming (Flora, OpenAI batch) não precisam
 *   implementar este contrato, evitando métodos "stub" desnecessários.
 */
export interface IStreamingChatService extends IChatService {
  /**
   * Envia uma mensagem e entrega a resposta em fragmentos via callbacks.
   * Retorna uma Promise que resolve quando o streaming completa ou falha.
   */
  sendMessageStream(
    payload: ChatServicePayload,
    callbacks: StreamingCallbacks,
  ): Promise<void>;
}

/**
 * Type guard para verificar em runtime se um IChatService suporta streaming.
 *
 * GRASP – Polymorphism:
 *   Permite que os consumidores decidam dinamicamente usar streaming
 *   sem conhecer a classe concreta.
 */
export function isStreamingChatService(
  service: IChatService,
): service is IStreamingChatService {
  return (
    typeof (service as IStreamingChatService).sendMessageStream === 'function'
  );
}
