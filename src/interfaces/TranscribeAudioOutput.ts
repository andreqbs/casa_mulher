export interface TranscribeAudioOutput {
    success: boolean;
    transcription: string;
    error?: string;
}