import {api} from "@/libs/api";

export async function forgotPasswordService(email: string) {
    const response = await api.post("/recover/request-password-reset", {
        email: email
    });
    return response.data;
}