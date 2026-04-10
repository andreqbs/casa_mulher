import { TranscribeAudioOutput } from '@/interfaces/TranscribeAudioOutput';
import { api } from "@/libs/api";

export async function transcribeAudioService(
    uri: string
): Promise<TranscribeAudioOutput> {
    const formData = new FormData();

    formData.append('audio', {
        uri,
        name: 'audio.wav',
        type: 'audio/wav',
    } as any);

    const response = await api.post<TranscribeAudioOutput>(
        '/transcription/transcribe',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 60000,
        }
    );

    return response.data;
}