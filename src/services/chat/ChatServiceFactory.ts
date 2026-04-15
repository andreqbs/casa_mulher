import type { IChatService } from './IChatService';
import { FloraConversationService } from './FloraConversationService';
import { OpenAIConversationService } from './OpenAIConversationService';

/** Singleton — evita criar múltiplas instâncias durante o ciclo de vida da app. */
let instance: IChatService | null = null;

/**
 * Retorna a implementação de IChatService correspondente ao provedor configurado
 * via DEFAULT_API_PROVIDER no .env ('flora' | 'chatkit').
 *
 * GRASP – Creator / Pure Fabrication:
 *   A factory centraliza a decisão de criação sem que os consumidores
 *   conheçam as classes concretas.
 *
 * SOLID – Open/Closed:
 *   Para adicionar um novo provedor, basta criar a classe e registrar aqui.
 */
export function getChatService(): IChatService {
  if (instance) return instance;

  switch (__APP_CHAT_PROVIDER__) {
    case 'chatkit':
      instance = new OpenAIConversationService();
      break;
    case 'flora':
    default:
      instance = new FloraConversationService();
      break;
  }

  return instance;
}

/**
 * Permite substituir a instância em testes ou em cenários de hot-reload.
 */
export function resetChatService(): void {
  instance = null;
}
