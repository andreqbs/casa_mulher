import { api } from "@/libs/api";

export interface ChatAudioResponse {
    success: boolean;
    /** Texto da resposta gerada pelo backend a partir do áudio */
    message: string;
    error?: string;
}

/**
 * Envia o áudio gravado para o endpoint do chat.
 *
 * O backend processa o áudio (speech-to-text + IA) e devolve
 * uma resposta em texto para ser exibida no chat.
 *
 * TODO: Alterar o endpoint abaixo para o endpoint real da sua API.
 */
export async function sendChatAudioService(
    uri: string,
    endpoint: string = "/chat/audio"
): Promise<ChatAudioResponse> {
    const formData = new FormData();

    formData.append("audio", {
        uri,
        name: "audio.wav",
        type: "audio/wav",
    } as any);

    const response = await api.post<ChatAudioResponse>(
        endpoint,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
        }
    );

    return response.data;
}
