export interface RatingOutput {
    id: string;
    userId: string;
    answerMark1: number | null;
    answerMark2: number | null;
    textAnswer1: string;
    textAnswer2: string;
    createdAt: string;
}