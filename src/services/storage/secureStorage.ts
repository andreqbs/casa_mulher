import * as SecureStore from "expo-secure-store";

export const secureStorage  = {
    async setItem(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.warn("Erro ao salvar item no SecureStore:", error);
        }
    },
    async getItem(key: string) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.warn("Erro ao obter item do SecureStore:", error);
            return null;
        }
    },
    async removeItem(key: string) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.warn("Erro ao remover item do SecureStore:", error);
        }
    },
    async clearAll() {
        await Promise.all([
            SecureStore.deleteItemAsync("accessToken"),
            SecureStore.deleteItemAsync("refreshToken"),
        ]);
    },

    async getToken() {
        try {
            return await SecureStore.getItemAsync("accessToken");
        } catch (error) {
            console.warn("Erro ao obter token:", error);
            return null;
        }
    },
};
