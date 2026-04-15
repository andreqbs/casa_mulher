import type { IChatService, ChatServicePayload, ChatServiceResponse } from './IChatService';

/**
 * Implementação do serviço de chat usando a Flora API.
 *
 * As requisições passam pelo proxy server-side (Vite em dev, Nginx em prod),
 * garantindo que o token de autenticação nunca chega ao bundle do browser.
 */
export class FloraConversationService implements IChatService {
  async sendMessage(payload: ChatServicePayload): Promise<ChatServiceResponse> {
    const response = await fetch('/flora-api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Erro na API Flora (${response.status}): ${errorBody}`);
    }

    return response.json() as Promise<ChatServiceResponse>;
  }
}
