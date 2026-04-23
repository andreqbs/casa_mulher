import React, { useCallback, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import ChatScreen, { ChatMessage } from '@/src/components/chat/ChatScreen';
import { OpenAINativeChatService } from '@/src/services/chat/OpenAINativeChatService';
import { debug } from '@/src/utils/debugLogger';
import girrafeImg from '@/src/assets/giraffe.png';

// ── Constantes de identidade ─────────────────────────────────────────────────

const FLORA_USER_ID = 'flora-ai';
const APP_USER_ID = 'casa-mulher-web';

// ── Tema visual (idêntico aos demais provedores) ──────────────────────────────

const FLORA_THEME = {
  userBubbleColor: '#c087ff',
  aiBubbleColor: '#ceffcb',
  userTextColor: '#FFFFFF',
  aiTextColor: '#374151',
  sendButtonColor: '#c087ff',
  backgroundColor: '#FFF8F0',
  placeholderText: 'Mensagem…',
};

// ── Mensagem de boas-vindas ───────────────────────────────────────────────────

const GREETING: ChatMessage = {
  id: 'flora-greeting',
  text: 'Olá! Sou a Flora \nEstou aqui para te ouvir com cuidado e sem julgamentos. Como você está se sentindo hoje?',
  userId: FLORA_USER_ID,
  createdAt: new Date().toISOString(),
};

// ── SessionId persistido em localStorage ─────────────────────────────────────

function getSessionId(): string {
  const key = 'openai_native_session_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `web-native-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface OpenAINativeChatProps {
  onBack: () => void;
}

// ── Componente ────────────────────────────────────────────────────────────────

/**
 * Interface de chat que usa o provider `openai-native`.
 *
 * Características:
 *   - Streaming real-time via SSE — o texto aparece progressivamente.
 *   - Sem dependência do ChatKit ou qualquer biblioteca de terceiros para chat.
 *   - Funciona em todos os navegadores baseados em Chromium, Firefox e Safari.
 *   - A mensagem em streaming é exibida ao vivo antes de ser consolidada no histórico.
 *
 * GRASP – Controller:
 *   Este componente coordena os eventos do ciclo de vida do streaming
 *   (onStart, onDelta, onComplete, onError) e os traduz para atualizações de estado.
 */
export default function OpenAINativeChat({
  onBack,
}: Readonly<OpenAINativeChatProps>) {
  const sessionId = useRef(getSessionId());

  /**
   * Instância singleton do serviço — criada uma única vez por montagem do componente.
   * O ref garante que o previousResponseId persiste entre re-renders sem ser recriado.
   */
  const chatServiceRef = useRef<OpenAINativeChatService>(
    new OpenAINativeChatService(),
  );

  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);

  /**
   * Mensagem que está sendo construída em tempo real via SSE.
   * Exibida como a primeira mensagem da lista enquanto o streaming está ativo.
   * Removida e substituída pela mensagem final ao completar.
   */
  const [streamingMessage, setStreamingMessage] =
    useState<ChatMessage | null>(null);

  /** Controla o indicador de "digitando…" enquanto aguardamos o primeiro delta. */
  const [aiTyping, setAiTyping] = useState(false);

  // ── Mensagens exibidas: streaming em primeiro lugar, depois histórico ───────

  const displayMessages: ChatMessage[] = streamingMessage
    ? [streamingMessage, ...messages]
    : messages;

  // ── Handler de envio ─────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      userId: APP_USER_ID,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [userMsg, ...prev]);
    setAiTyping(true);

    const streamId = `streaming-${Date.now()}`;

    debug.log('[OpenAINativeChat] Enviando:', text.slice(0, 60));

    await chatServiceRef.current.sendMessageStream(
      {
        message: text,
        sessionId: sessionId.current,
        userId: APP_USER_ID,
        metadata: { source: 'casa-mulher-web-native', userId: APP_USER_ID },
      },
      {
        onStart: () => {
          debug.log('[OpenAINativeChat] Streaming iniciado');
          // Remove o indicador de "digitando" e começa a mostrar texto progressivo
          setAiTyping(false);
          setStreamingMessage({
            id: streamId,
            text: '',
            userId: FLORA_USER_ID,
            createdAt: new Date().toISOString(),
          });
        },

        onDelta: (delta) => {
          setStreamingMessage((prev) =>
            prev ? { ...prev, text: prev.text + delta } : null,
          );
        },

        onComplete: (fullText) => {
          debug.log(
            '[OpenAINativeChat] Streaming completo | chars:',
            fullText.length,
          );
          // Move a mensagem do streaming para o histórico permanente
          setStreamingMessage(null);
          setMessages((prev) => [
            {
              id: streamId,
              text: fullText,
              userId: FLORA_USER_ID,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
          setAiTyping(false);
        },

        onError: (error) => {
          debug.error('[OpenAINativeChat] Erro:', error);
          setStreamingMessage(null);
          setAiTyping(false);
          setMessages((prev) => [
            {
              id: `err-${Date.now()}`,
              text: 'Não consegui processar sua mensagem agora. Verifique sua conexão e tente novamente.',
              userId: FLORA_USER_ID,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
        },
      },
    );
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#A17AAA] text-white flex-shrink-0">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white p-1 -ml-1"
          aria-label="Voltar"
        >
          <ChevronLeft />
        </button>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <img
            src={girrafeImg}
            className="w-full h-full object-cover brightness-0 invert"
            referrerPolicy="no-referrer"
            alt="Flora"
          />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">Flora</p>
          <p className="text-white/70 text-[11px]">
            {aiTyping
              ? 'digitando…'
              : streamingMessage !== null
                ? 'respondendo…'
                : 'online'}
          </p>
        </div>
      </div>

      {/* Chat */}
      <ChatScreen
        currentUserId={APP_USER_ID}
        messages={displayMessages}
        onSendMessage={sendMessage}
        aiIsTyping={aiTyping}
        theme={FLORA_THEME}
      />
    </div>
  );
}
