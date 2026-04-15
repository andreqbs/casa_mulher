import React, {useCallback, useRef, useState} from 'react';
import {ChatKit, useChatKit} from '@openai/chatkit-react';
import ChatScreen, {ChatMessage} from '@/src/components/chat/ChatScreen';
import {ChevronLeft} from 'lucide-react';
import girrafeImg from '@/src/assets/giraffe.png';
import {debug} from '@/src/utils/debugLogger';

const FLORA_USER_ID = 'flora-ai';
const APP_USER_ID = 'casa-mulher-web';

const FLORA_THEME = {
    userBubbleColor: '#c087ff',
    aiBubbleColor: '#ceffcb',
    userTextColor: '#FFFFFF',
    aiTextColor: '#374151',
    sendButtonColor: '#c087ff',
    backgroundColor: '#FFF8F0',
    placeholderText: 'Mensagem…',
};

const GREETING: ChatMessage = {
    id: 'flora-greeting',
    text: 'Olá! Sou a Flora \nEstou aqui para te ouvir com cuidado e sem julgamentos. Como você está se sentindo hoje?',
    userId: FLORA_USER_ID,
    createdAt: new Date().toISOString(),
};

/* ── userId persistido ──────────────────────────────────────────────── */
function getOrCreateUserId(): string {
    const key = 'chatkit_user_id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(key, id);
    }
    return id;
}

const CHATKIT_USER_ID = getOrCreateUserId();

/* ── ChatKit session helper ─────────────────────────────────────────── */
async function getClientSecret(): Promise<string> {
    const r = await fetch('/chatkit-api/sessions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            workflow: {id: __CHATKIT_WORKFLOW_ID__},
            user: CHATKIT_USER_ID,
        }),
    });
    if (!r.ok) {
        const err = await r.text();
        throw new Error(`Session creation failed (${r.status}): ${err}`);
    }
    const data = await r.json();
    debug.log('Sessão criada:', data.id ?? '(sem id)');
    return data.client_secret;
}

/* ── Busca resposta do assistente via Thread Items API ──────────────── */
async function fetchAssistantText(
    threadId: string,
    knownMsgCount: number,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    setAiTyping: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const MAX_ATTEMPTS = 5;
    const INITIAL_DELAY_MS = 500;
    const RETRY_DELAY_MS = 1000;

    // Delay inicial curto — a resposta geralmente já está persistida quando onResponseEnd dispara
    await new Promise(r => setTimeout(r, INITIAL_DELAY_MS));

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const url = `/chatkit-api/threads/${threadId}/items?order=desc&limit=10`;
            debug.log(`Fetch items tentativa ${attempt}/${MAX_ATTEMPTS}: ${url}`);

            const res = await fetch(url);
            const raw = await res.text();
            debug.log(`Status: ${res.status} | Content-Type: ${res.headers.get('content-type')}`);
            debug.log(`Body (500 chars):`, raw.slice(0, 500));

            if (!res.ok) {
                debug.error(`HTTP ${res.status} — abortando`);
                break;
            }

            let data: { data?: unknown[] };
            try {
                data = JSON.parse(raw);
            } catch {
                debug.error('Resposta não é JSON válido');
                break;
            }

            if (!Array.isArray(data.data)) {
                debug.warn('data.data não é array:', typeof data.data);
                break;
            }

            debug.log(`${data.data.length} items retornados`);

            // Log cada item para diagnóstico
            for (const item of data.data) {
                debug.log('Item:', JSON.stringify(item).slice(0, 400));
            }

            // Tenta extrair texto do assistente de qualquer formato conhecido
            let assistantText = '';

            for (const item of data.data as Record<string, unknown>[]) {
                // Formato 1: { type: "chatkit.assistant_message" | "assistant_message", content: [{ type: "output_text", text: "..." }] }
                if ((item.type === 'chatkit.assistant_message' || item.type === 'assistant_message') && Array.isArray(item.content)) {
                    assistantText = (item.content as { type: string; text?: string }[])
                        .filter(c => c.type === 'output_text' && c.text)
                        .map(c => c.text!)
                        .join('');
                    if (assistantText) break;
                }

                // Formato 2: { role: "assistant", content: "..." }
                if (item.role === 'assistant' && typeof item.content === 'string') {
                    assistantText = item.content;
                    if (assistantText) break;
                }

                // Formato 3: { type: "message", role: "assistant", content: [...] }
                if (item.type === 'message' && item.role === 'assistant' && Array.isArray(item.content)) {
                    assistantText = (item.content as { type: string; text?: string }[])
                        .filter(c => (c.type === 'text' || c.type === 'output_text') && c.text)
                        .map(c => c.text!)
                        .join('');
                    if (assistantText) break;
                }

                // Formato 4: qualquer item com output_text diretamente
                if (typeof item.output_text === 'string') {
                    assistantText = item.output_text;
                    if (assistantText) break;
                }

                // Formato 5: item com text diretamente
                if (typeof item.text === 'string' && item.type !== 'user_message') {
                    assistantText = item.text;
                    if (assistantText) break;
                }
            }

            if (assistantText.trim()) {
                debug.log('✅ Texto extraído:', assistantText.slice(0, 100));
                const floraMsg: ChatMessage = {
                    id: `flora-${Date.now()}`,
                    text: assistantText.trim(),
                    userId: FLORA_USER_ID,
                    createdAt: new Date().toISOString(),
                };
                setMessages(prev => [floraMsg, ...prev]);
                setAiTyping(false);
                return;
            }

            debug.log(`Nenhum texto de assistente encontrado (tentativa ${attempt}/${MAX_ATTEMPTS})`);
        } catch (e) {
            debug.error(`Erro no fetch (tentativa ${attempt}):`, e);
        }

        if (attempt < MAX_ATTEMPTS) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
        }
    }

    debug.warn('❌ Falha após todas as tentativas');
    setAiTyping(false);
}

interface ChatkitChatProps {
    onBack: () => void;
}

export default function ChatkitChat({onBack}: Readonly<ChatkitChatProps>) {
    const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
    const [aiTyping, setAiTyping] = useState(false);
    const [ready, setReady] = useState(false);

    const threadIdRef = useRef<string | null>(null);
    const msgCountRef = useRef(0); // conta mensagens do assistente já exibidas

    const chatkit = useChatKit({
        api: {getClientSecret},
        locale: 'pt-BR',
        header: {enabled: false},
        history: {enabled: false},
        threadItemActions: {feedback: false, retry: false},
        startScreen: {greeting: ''},
        composer: {placeholder: ''},
        theme: {
            colorScheme: 'light',
            density: 'compact',
            color: {surface: {background: '#FFF8F0', foreground: '#FFF8F0'}},
        },
        onReady: () => {
            debug.log('ChatKit pronto');
            setReady(true);
        },
        onThreadChange: ({threadId}: {threadId: string | null}) => {
            debug.log('Thread alterado:', threadId);
            threadIdRef.current = threadId;
        },
        onResponseStart: () => {
            debug.log('Resposta iniciada');
            setAiTyping(true);
        },
        onResponseEnd: () => {
            debug.log('Resposta finalizada — threadId:', threadIdRef.current);
            if (threadIdRef.current) {
                fetchAssistantText(
                    threadIdRef.current,
                    msgCountRef.current,
                    setMessages,
                    setAiTyping,
                ).then(() => {
                    msgCountRef.current++;
                });
            } else {
                debug.warn('Sem threadId — não é possível buscar resposta');
                setAiTyping(false);
            }
        },
        onError: ({error}: {error: Error}) => {
            debug.error('ChatKit error:', error);
            setAiTyping(false);
        },
    });

    const sendMessage = useCallback(async (text: string) => {
        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            text,
            userId: APP_USER_ID,
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [userMsg, ...prev]);
        setAiTyping(true);

        try {
            debug.log('Enviando mensagem:', text, '| ready:', ready);
            await chatkit.sendUserMessage({text});
            debug.log('sendUserMessage concluído');
        } catch (e) {
            debug.error('Erro ao enviar mensagem:', e);
            setAiTyping(false);
            setMessages(prev => [
                {
                    id: `err-${Date.now()}`,
                    text: 'Não consegui enviar sua mensagem. Verifique sua conexão e tente novamente.',
                    userId: FLORA_USER_ID,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ]);
        }
    }, [chatkit, ready]);

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* ChatKit oculto — motor de backend do Agent Builder */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: '-9999px',
                    left: 0,
                    width: 400,
                    height: 600,
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            >
                <ChatKit control={chatkit.control} className="block h-full w-full"/>
            </div>

            {/* Header personalizado Flora */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#A17AAA] text-white flex-shrink-0">
                <button
                    onClick={onBack}
                    className="text-white/80 hover:text-white p-1 -ml-1"
                    aria-label="Voltar"
                >
                    <ChevronLeft/>
                </button>
                <div
                    className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                    <img
                        src={girrafeImg}
                        className="w-full h-full object-cover brightness-0 invert"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div>
                    <p className="font-bold text-sm leading-tight">Flora</p>
                    <p className="text-white/70 text-[11px]">
                        {aiTyping ? 'digitando…' : 'online'}
                    </p>
                </div>
            </div>

            {/* Área de chat — visual idêntico ao chat.tsx */}
            <div className="flex-1 overflow-hidden">
                <ChatScreen
                    currentUserId={APP_USER_ID}
                    messages={messages}
                    onSendMessage={sendMessage}
                    aiIsTyping={aiTyping}
                    theme={FLORA_THEME}
                />
            </div>
        </div>
    );
}
