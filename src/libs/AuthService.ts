import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import {logError} from "@/services/log/LogService";

interface RefreshResponse {
    success: boolean;
    token: string;
    refreshToken: string;
    type: string;
}

class AuthService {
    private readonly TOKEN_KEY = "token";
    private readonly REFRESH_KEY = "refreshToken";

    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem(this.TOKEN_KEY);
    }

    async getRefreshToken(): Promise<string | null> {
        return await AsyncStorage.getItem(this.REFRESH_KEY);
    }

    async setTokens(token: string, refreshToken: string): Promise<void> {
        await AsyncStorage.setItem(this.TOKEN_KEY, token);
        await AsyncStorage.setItem(this.REFRESH_KEY, refreshToken);
    }

    async clearTokens(): Promise<void> {
        await AsyncStorage.multiRemove([this.TOKEN_KEY, this.REFRESH_KEY]);
    }

    async refreshToken(): Promise<string> {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        try {
            const response = await api.post<RefreshResponse>("/user/refresh-token", {
                refreshToken,
            });

            const { success, token, refreshToken: newRefresh, type } = response.data;

            if (!success) throw new Error("Failed to refresh token");

            const fullToken = `${type} ${token}`;
            await this.setTokens(fullToken, newRefresh);
            return fullToken;
        } catch (error) {
            await this.clearTokens();
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            const token = await this.getToken();
            if (token) {
                await api.get("/user/logout", {
                    headers: { Authorization: token },
                });
            }
        } catch (error) {
            await logError("Erro ao fazer logout" + error);
            console.warn("Erro ao fazer logout:", error);
        } finally {
            await this.clearTokens();
        }
    }
}

export const tokenService = new AuthService();
