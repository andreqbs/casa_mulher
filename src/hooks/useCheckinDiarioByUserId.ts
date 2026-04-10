import {CheckinOutput} from "@/interfaces/CheckinOutput";
import {api} from "@/libs/api";

interface DataCheckin {
    error?: string;
    message?: string;
    status?: number;
    success?: boolean;
    data?: CheckinOutput[];
}

export const useCheckinDiarioByUserId = {
    async findLatestByUserId(
        userId: string
    ): Promise<CheckinOutput | null> {

        const response = await api.get<DataCheckin>(
            `checkin-diario/${userId}/latest`
        );

        if (!response.data.success || !response.data.data) {
            return null;
        }

        return response.data.data[0] ?? null;
    }
};
