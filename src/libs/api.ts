import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {secureStorage} from "@/services/storage/secureStorage";
import {ApiMessageData} from "@/interfaces/ApiMessageData";
import {getAppInfo} from "@/utils/appInfo";
import {appEvents} from "@/utils/appEvents";
import {ApiException} from "@/exceptions/ApiException";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await secureStorage.getItem("accessToken");
        const {appVersion, appBuild, platform} = getAppInfo();

        config.headers.set("x-app-version", appVersion);
        config.headers.set("x-app-build", appBuild);
        config.headers.set("x-app-platform", platform);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) =>
        error ? prom.reject(error) : prom.resolve(token as string)
    );
    failedQueue = [];
};

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;
        const status = error.response?.status;
        const apiError = error.response?.data as ApiMessageData

        if (status === 401 && !originalRequest._retry) {
            const refreshTokenStored = await secureStorage.getItem("refreshToken");

            const isAuthRoute =
                originalRequest.url?.includes("/user/login") ||
                originalRequest.url?.includes("/user/refresh-token");

            if (!refreshTokenStored || isAuthRoute) {
                throw new ApiException(apiError, status);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                await secureStorage.clearAll();

                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        } else if (status === 426) {
            appEvents.emit('FORCE_UPDATE');
        }

        throw error
    }
);

async function refreshToken(): Promise<string> {
    const refreshToken = await secureStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await api.post("/user/refresh-token", {refreshToken});
    const {success, token, refreshToken: newRefresh, type} = response.data;

    if (!success) throw new Error("Failed to refresh token");

    const fullToken = `${type} ${token}`;
    await secureStorage.setItem("accessToken", fullToken);
    await secureStorage.setItem("refreshToken", newRefresh);

    return fullToken;
}