export interface CheckinInput {
    userId: string;
    question_id: string;
    duration: number;
    answer?: string;
    started?: string;
    finished?: string;
    createdAt?: string;
}
