import {ApiMessageData} from "@/interfaces/ApiMessageData";

export function mapApiError(apiError: ApiMessageData): string {
    const code = apiError?.error || "";

    const errorMessages: Record<string, string> = {
        not_find_user: "Usuário não encontrado.",
        invalid_credentials: "Credenciais inválidas. Verifique seu login ou senha.",
        expired_token: "Sua sessão expirou. Faça login novamente.",
        unauthorized: "Você não tem permissão para acessar este recurso.",
        internal_error: "Ocorreu um erro interno. Tente novamente mais tarde.",
        bad_request: "Os dados enviados estão incorretos. Verifique e tente novamente.",
        not_authorized: "Usuário ou senha inválidos.",
        default: "Ocorreu um erro inesperado. Tente novamente.",
    };

    return errorMessages[code] || apiError?.message || errorMessages.default;
}