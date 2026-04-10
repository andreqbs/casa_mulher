import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface ChatMessage {
  id: string;
  text: string;
  createdAt: string | number | Date;
  userId: string; // 'flora-ai' para mensagens da Flora
}

export interface ChatTheme {
  userBubbleColor?: string;
  aiBubbleColor?: string;
  userTextColor?: string;
  aiTextColor?: string;
  sendButtonColor?: string;
  backgroundColor?: string;
  placeholderText?: string;
}

export interface ChatScreenProps {
  currentUserId: string;
  messages: ChatMessage[];           // mais recente no index 0
  onSendMessage: (text: string) => Promise<void>;
  hasMoreOlderMessages?: boolean;
  onLoadOlderMessages?: () => Promise<void>;
  initialLoading?: boolean;
  aiIsTyping?: boolean;
  theme?: ChatTheme;
}

function formatTime(date: string | number | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatScreen({
  currentUserId,
  messages,
  onSendMessage,
  hasMoreOlderMessages = false,
  onLoadOlderMessages,
  initialLoading = false,
  aiIsTyping = false,
  theme = {},
}: ChatScreenProps) {
  const {
    userBubbleColor   = '#F37335',
    aiBubbleColor     = '#FFF3E0',
    userTextColor     = '#FFFFFF',
    aiTextColor       = '#111827',
    sendButtonColor   = '#F37335',
    backgroundColor   = '#FFF8F0',
    placeholderText   = 'Digite sua mensagem…',
  } = theme;

  const [input, setInput]   = useState('');
  const [sending, setSending] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rola para o fim quando chegam novas mensagens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, aiIsTyping]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setInput('');
    setSending(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    try {
      await onSendMessage(trimmed);
    } finally {
      setSending(false);
    }
  }, [input, onSendMessage, sending]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-grow
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleLoadOlder = useCallback(async () => {
    if (!onLoadOlderMessages || loadingOlder) return;
    setLoadingOlder(true);
    try { await onLoadOlderMessages(); } finally { setLoadingOlder(false); }
  }, [onLoadOlderMessages, loadingOlder]);

  // Mensagens exibidas do mais antigo (fundo) ao mais novo (topo da lista = final da tela)
  const displayed = [...messages].reverse();

  if (initialLoading) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor }}>
        <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor }}>

      {/* Carregar mensagens mais antigas */}
      {hasMoreOlderMessages && (
        <div className="flex justify-center py-2">
          <button
            onClick={handleLoadOlder}
            disabled={loadingOlder}
            className="text-xs text-slate-500 border border-slate-200 px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 disabled:opacity-50"
          >
            {loadingOlder ? 'Carregando…' : 'Ver mensagens anteriores'}
          </button>
        </div>
      )}

      {/* Lista de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {displayed.length === 0 && (
          <p className="text-center text-sm text-slate-400 mt-8">
            Diga oi para a Flora 🌿
          </p>
        )}

        {displayed.map((msg) => {
          const isUser = msg.userId === currentUserId;
          return (
            <div
              key={msg.id}
              className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed',
                  isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
                )}
                style={{
                  backgroundColor: isUser ? userBubbleColor : aiBubbleColor,
                  color: isUser ? userTextColor : aiTextColor,
                }}
              >
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                <p
                  className={cn(
                    'text-[10px] mt-1 text-right',
                    isUser ? 'text-white/60' : 'text-slate-400'
                  )}
                >
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}

        {/* Indicador de digitação da Flora */}
        {(aiIsTyping || sending) && (
          <div className="flex justify-start">
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm"
              style={{ backgroundColor: aiBubbleColor }}
            >
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-end gap-2 px-4 py-3 border-t border-slate-100"
        style={{ backgroundColor }}
      >
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 flex items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            rows={1}
            disabled={sending}
            className="flex-1 resize-none outline-none text-sm text-slate-800 placeholder:text-slate-300 bg-transparent leading-relaxed disabled:opacity-50"
            style={{ maxHeight: 120 }}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!input.trim() || sending}
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-opacity disabled:opacity-40 active:scale-95"
          style={{ backgroundColor: sendButtonColor }}
        >
          {sending
            ? <Loader2 className="w-5 h-5 text-white animate-spin" />
            : <Send className="w-5 h-5 text-white" />
          }
        </button>
      </div>
    </div>
  );
}
