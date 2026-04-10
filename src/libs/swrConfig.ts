import { SWRConfiguration } from "swr";
import { api } from "@/libs/api";

export const fetcher = async (url: string) => {
    const response = await api.get(url);
    return response.data;
};

export const swrConfig: SWRConfiguration = {
    fetcher,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
};
