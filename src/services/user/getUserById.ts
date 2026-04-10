import {api} from "@/libs/api";
import {ProfileOutput2} from "@/interfaces/ProfileOutput2";

export async function getUserProfile() {
    const response = await api.get("/user/perfil");
    return response.data.user as ProfileOutput2;
}
