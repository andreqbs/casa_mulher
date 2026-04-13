import React, {useCallback, useRef, useState} from 'react';
import ChatScreen, {ChatMessage} from '@/src/components/chat/ChatScreen';
import {sendMessageAPI} from '@/src/services/chat/conversationService';
import {ChevronLeft} from "lucide-react";
import girrafeImg from "@/src/assets/giraffe.png"

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
    text: 'Olá! Sou a Flora 🌿\nEstou aqui para te ouvir com cuidado e sem julgamentos. Como você está se sentindo hoje?',
    userId: FLORA_USER_ID,
    createdAt: new Date().toISOString(),
};

/** Gera ou recupera um sessionId anônimo persistido em localStorage. */
function getSessionId(): string {
    const key = 'flora_session_id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(key, id);
    }
    return id;
}

interface FloraChatProps {
    onBack: () => void;
}

export default function FloraChat({onBack}: Readonly<FloraChatProps>) {
    const sessionId = useRef(getSessionId());

    const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
    const [aiTyping, setAiTyping] = useState(false);

    const sendMessage = useCallback(async (text: string) => {
        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            text,
            userId: APP_USER_ID,
            createdAt: new Date().toISOString(),
        };

        // Adiciona mensagem do usuário imediatamente (otimistic update)
        setMessages(prev => [userMsg, ...prev]);
        setAiTyping(true);

        try {
            const response = await sendMessageAPI({
                message: text,
                sessionId: sessionId.current,
                userId: APP_USER_ID,
                metadata: {source: 'casa-mulher-web', userId: APP_USER_ID},
            });

            if (response.text) {
                const floraMsg: ChatMessage = {
                    id: `flora-${Date.now()}`,
                    text: response.text,
                    userId: FLORA_USER_ID,
                    createdAt: new Date().toISOString(),
                };
                setMessages(prev => [floraMsg, ...prev]);
            }
        } catch {
            setMessages(prev => [
                {
                    id: `err-${Date.now()}`,
                    text: 'Não consegui processar sua mensagem agora. Verifique sua conexão e tente novamente.',
                    userId: FLORA_USER_ID,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ]);
        } finally {
            setAiTyping(false);
        }
    }, []);

    return (
        <div className="flex flex-col flex-1 min-h-0">
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
