// Todas as chamadas vão para /flora-api, que é um proxy server-side configurado no
// Vite (dev) e no Nginx (prod). O token nunca chega ao bundle do browser.

export interface ConversationResponse {
  text: string;
  conversationId: string;
}

interface SendMessagePayload {
  message: string;
  sessionId: string;
  userId: string;
  metadata?: {
    source: string;
    userId: string;
  };
}

export async function sendMessageAPI(payload: SendMessagePayload): Promise<ConversationResponse> {
  const response = await fetch('/flora-api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na API Flora (${response.status}): ${errorBody}`);
  }

  return response.json() as Promise<ConversationResponse>;
}
