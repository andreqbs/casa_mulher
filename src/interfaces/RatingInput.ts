export interface RatingFieldsInput {
    answerMark1: number | null;
    answerMark2: number | null;
    textAnswer1: string;
    textAnswer2: string;
}

export interface RatingInput extends RatingFieldsInput {
    status: string;
    userId: string;
}