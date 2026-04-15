/**
 * Contrato para serviços de chat com agentes de IA.
 *
 * Segue o princípio de Inversão de Dependência (DIP/SOLID):
 * consumidores dependem desta abstração, nunca de implementações concretas.
 */

export interface ChatServicePayload {
  message: string;
  sessionId: string;
  userId: string;
  metadata?: Record<string, string>;
}

export interface ChatServiceResponse {
  text: string;
  conversationId: string;
}

export interface IChatService {
  sendMessage(payload: ChatServicePayload): Promise<ChatServiceResponse>;
}
