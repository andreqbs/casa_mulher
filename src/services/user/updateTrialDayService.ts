import {api} from "@/libs/api";
import {ApiMessageData} from "@/interfaces/ApiMessageData";

export async function updateTrialDayService(id: string) {

    const response = await api.post<ApiMessageData>(
        `${process.env.EXPO_PUBLIC_API_URL}/user/ativar-trial`, id);
    return {...response.data};
}