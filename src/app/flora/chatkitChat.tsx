import React, {useState} from 'react';
import {ChatKit, useChatKit} from '@openai/chatkit-react';
import {ChevronLeft} from 'lucide-react';
import girrafeImg from '@/src/assets/giraffe.png';

async function getClientSecret(): Promise<string> {
    const userId = getOrCreateUserId();
    const r = await fetch('/chatkit-api/sessions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            workflow: {id: __CHATKIT_WORKFLOW_ID__},
            user: userId,
        }),
    });
    if (!r.ok) {
        const err = await r.text();
        throw new Error(`Session creation failed (${r.status}): ${err}`);
    }
    const data = await r.json();
    return data.client_secret;
}

function getOrCreateUserId(): string {
    const key = 'chatkit_user_id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(key, id);
    }
    return id;
}

interface ChatkitChatProps {
    onBack: () => void;
}

const CHATKIT_DEBUG = __CHATKIT_DEBUG__;

export default function ChatkitChat({onBack}: Readonly<ChatkitChatProps>) {
    const [aiTyping, setAiTyping] = useState(false);

    const chatkit = useChatKit({
        api: {getClientSecret},
        locale: 'pt-BR',
        header: {enabled: false},
        history: {enabled: false},
        threadItemActions: {
            feedback: CHATKIT_DEBUG,
            retry: CHATKIT_DEBUG,
        },
        startScreen: {
            greeting: 'Olá! Sou a Flora\nEstou aqui para te ouvir com cuidado e sem julgamentos. Como você está se sentindo hoje?',
        },
        composer: {
            placeholder: 'Mensagem…',
        },
        theme: {
            colorScheme: 'light',
            density: 'spacious',
            radius: 'round',
            color: {
                accent: {primary: '#A17AAA', level: 2},
                surface: {background: '#FFF8F0', foreground: '#FFF'},
            },
            typography: {
                fontFamily: "'Inter', sans-serif",
            },
        },
        onResponseStart: () => setAiTyping(true),
        onResponseEnd: () => setAiTyping(false),
        onError: ({error}) => console.error('ChatKit error:', error),
    });

    return (
        <div className="flex flex-col flex-1 min-h-0">
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

            {/* Área de chat — ChatKit iframe com Agent Builder */}
            <div className="flex-1 overflow-hidden">
                <ChatKit control={chatkit.control} className="block h-full w-full"/>
            </div>
        </div>
    );
}
