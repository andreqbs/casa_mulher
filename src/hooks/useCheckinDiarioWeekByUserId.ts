import {CheckinOutput} from "@/interfaces/CheckinOutput";
import useSWR from "swr";

interface CheckinApiResponse {
    data: CheckinOutput[];
    message?: string | null;
    status?: number;
    success?: boolean;
}

export function useCheckinDiarioWeekByUserId(userId: string) {
        const { data, error, isLoading, isValidating, mutate } = useSWR<CheckinApiResponse>(
            userId ? `checkin-diario/${userId}/week` : null
        );

    return {
        checkins: data?.data ?? [],
        isLoadingCheckins: isLoading,
        isValidatingCheckins: isValidating,
        isErrorCheckins: error,
        mutateCheckins: mutate,
    }
}