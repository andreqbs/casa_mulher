import {UserQuestionAnswer} from "@/interfaces/QuestionAnswer";
import {api} from "@/libs/api";

export const userQuestionAnswerService = {
    async findByUserId(userId: string): Promise<UserQuestionAnswer[]> {
        const { data } = await  api.get(`user-question-answer/${userId}`);
        return data;
    },
};
