import {create} from "zustand";
import {persist} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {PersistStorage, StorageValue} from "zustand/middleware";
import {getChatService} from "@/services/chat/ChatServiceFactory";
import {ChatMessage} from "@/components/chat/ChatScreen";

const AI_ID = "flora-ai";

/** Limite máximo de mensagens no cache local para evitar crescimento infinito */
const MAX_CACHED_MESSAGES = 100;

interface ConversationState {
    conversationId: string | null;
    messages: ChatMessage[];
    loading: boolean;

    sendMessage: (text: string, userId: string, email: string) => Promise<void>;
    loadHistoryMessages: (olderMessages: ChatMessage[]) => void;
    clearConversation: () => void;
}

/**
 * PersistStorage corretamente tipado para ConversationState
 */
const conversationStorage: PersistStorage<ConversationState> = {
    getItem: async (name) => {
        const value = await AsyncStorage.getItem(name);
        if (!value) return null;

        return JSON.parse(value) as StorageValue<ConversationState>;
    },

    setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
    },

    removeItem: async (name) => {
        await AsyncStorage.removeItem(name);
    },
};

/**
 * Limita o array de mensagens ao MAX_CACHED_MESSAGES mais recentes.
 * O array está ordenado do mais recente (index 0) ao mais antigo.
 */
function limitMessages(messages: ChatMessage[]): ChatMessage[] {
    if (messages.length <= MAX_CACHED_MESSAGES) return messages;
    return messages.slice(0, MAX_CACHED_MESSAGES);
}

export const useConversationStore = create<ConversationState>()(
    persist(
        (set, get) => ({
            conversationId: null,
            messages: [],
            loading: false,

            sendMessage: async (text, userId, email) => {
                const userMessage: ChatMessage = {
                    id: `user-${Date.now()}`,
                    text,
                    userId: userId,
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    messages: limitMessages([userMessage, ...state.messages]),
                    loading: true,
                }));

                try {
                    const chatService = getChatService();
                    const response = await chatService.sendMessage({
                        message: text,
                        // userId: userId,
                        userId: "hooy-app-user",
                        sessionId: email,
                        metadata: {
                            source: "aplicativo-android",
                            userId: "hooy-app-user",
                        },
                    });

                    if (response.conversationId) {
                        set({conversationId: response.conversationId});
                    }

                    if (response.text) {
                        const aiMessage: ChatMessage = {
                            id: `ai-${Date.now()}`,
                            text: response.text,
                            userId: AI_ID,
                            createdAt: new Date().toISOString(),
                        };

                        set((state) => ({
                            messages: limitMessages([aiMessage, ...state.messages]),
                            loading: false,
                        }));
                    } else {
                        set({loading: false});
                    }
                } catch (error) {
                    console.error("[ConversationStore] Erro ao enviar mensagem:", error);

                    // Mostra mensagem de erro como feedback na conversa
                    const errorMessage: ChatMessage = {
                        id: `error-${Date.now()}`,
                        text: "Desculpe, não consegui processar sua mensagem. Verifique sua conexão e tente novamente.",
                        userId: AI_ID,
                        createdAt: new Date().toISOString(),
                    };

                    set((state) => ({
                        messages: limitMessages([errorMessage, ...state.messages]),
                        loading: false,
                    }));
                }
            },

            /**
             * Adiciona mensagens do histórico (mais antigas) ao final do array.
             * Deduplicação por ID para evitar mensagens duplicadas ao sincronizar.
             */
            loadHistoryMessages: (olderMessages) => {
                set((state) => {
                    const existingIds = new Set(state.messages.map((m) => m.id));
                    const newMessages = olderMessages.filter(
                        (m) => !existingIds.has(m.id)
                    );

                    if (newMessages.length === 0) return state;

                    return {
                        messages: limitMessages([...state.messages, ...newMessages]),
                    };
                });
            },

            clearConversation: () => {
                set({
                    conversationId: null,
                    messages: [],
                    loading: false,
                });
            },
        }),
        {
            name: "conversation-store",
            storage: conversationStorage,
        }
    )
);
