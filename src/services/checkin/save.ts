import {CheckinInput} from "@/interfaces/CheckinInput";
import {CheckinOutput} from "@/interfaces/CheckinOutput";
import {api} from "@/libs/api";

export async function saveCheckinService({
                                             userId,
                                             question_id,
                                             duration,
                                             answer,
                                             started,
                                             finished,
                                         }: CheckinInput): Promise<{ status: number; data: CheckinOutput }> {

    const data = {userId, question_id, duration, answer, started, finished};

    const response = await api.post<CheckinOutput>(
        `${process.env.EXPO_PUBLIC_API_URL}/checkin-diario/add-checkin`,
        data
    );

    return {status: response.status, data: response.data}
}