import useSWR from "swr";
import {ProfileOutput2} from "@/interfaces/ProfileOutput2";

interface ProfileApiResponse {
    success: boolean;
    user: ProfileOutput2;
}

export function useUserById(userId: string) {
    const { data, error, isLoading, isValidating, mutate } = useSWR<ProfileApiResponse>(
        userId ? `user/perfil` : null
    );

    return {
        profile: data?.user as ProfileOutput2,
        isLoadingProfile: isLoading,
        isValidatingProfile: isValidating,
        isErrorProfile: error,
        mutateProfile: mutate,
    };
}
