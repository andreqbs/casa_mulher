export interface ConversationResponse {
    text: string;
    conversationId: string;
    metadata?: {
        agentName?: string;
        model?: string;
        responseTimeMs?: number;
        sttUsed?: boolean;
        ttsUsed?: boolean;
        fileProcessed?: boolean;
        imagesProcessed?: boolean;
        imageCount?: number;
    };
}
