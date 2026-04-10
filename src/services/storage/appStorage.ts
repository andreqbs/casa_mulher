import AsyncStorage from "@react-native-async-storage/async-storage";

export const appStorage = {
    async setItem(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.warn("Erro ao salvar item no AsyncStorage:", error);
        }
    },

    async getItem(key: string) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.warn("Erro ao obter item do AsyncStorage:", error);
            return null;
        }
    },

    async removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.warn("Erro ao remover item do AsyncStorage:", error);
        }
    },

    async clearAll() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.warn("Erro ao limpar o AsyncStorage:", error);
        }
    },

    async setBoolean(key: string, value: boolean) {
        await this.setItem(key, value ? "true" : "false");
    },

    async getBoolean(key: string): Promise<boolean> {
        const v = await this.getItem(key);
        return v === "true";
    },

    async getBooleanWithDefault(key: string, defaultValue: boolean): Promise<boolean> {
        const existing = await this.getItem(key);

        if (existing === null) {
            await this.setBoolean(key, defaultValue);
            return defaultValue;
        }

        return existing === "true";
    },

    async increment(key: string) {
        const current = Number(await this.getItem(key)) || 0;
        const next = current + 1;
        await this.setItem(key, String(next));
        return next;
    },
};
