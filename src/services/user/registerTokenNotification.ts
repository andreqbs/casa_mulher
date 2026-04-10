import {api} from "@/libs/api";
import {ApiMessageData} from "@/interfaces/ApiMessageData";
import {PushTokenInput} from "@/interfaces/PushTokenInput";

export async function updatePushTokenService(data: PushTokenInput) {
    const response = await api.post<ApiMessageData>(
        `${process.env.EXPO_PUBLIC_API_URL}/user/update-push-token`,
        data
    );

    return { ...response.data };
}