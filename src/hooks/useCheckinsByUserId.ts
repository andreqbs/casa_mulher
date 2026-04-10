import useSWR from "swr";
import { CheckinOutput } from "@/interfaces/CheckinOutput";

export function useCheckinsByUserId(userId: string) {
    const { data, error, isLoading, isValidating, mutate } = useSWR<CheckinOutput[]>(
        userId ? `checkin-diario/${userId}` : null
    );

    return {
        checkins: data ?? [],
        isLoadingCheckins: isLoading,
        isValidatingCheckins: isValidating,
        isErrorCheckins: error,
        mutateCheckins: mutate,
    };
}