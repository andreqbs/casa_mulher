import {useState, useEffect, useCallback, useRef} from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const HEALTH_TIMEOUT = 5000;
const CHECK_INTERVAL = 30000;

export function useApiHealth() {
    const [isApiOnline, setIsApiOnline] = useState(true);
    const [isChecking, setIsChecking] = useState(true);
    const mountedRef = useRef(true);

    const checkHealth = useCallback(async (): Promise<boolean> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), HEALTH_TIMEOUT);

            const response = await fetch(`${API_URL}/health`, {
                method: "GET",
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return response.ok;
        } catch {
            return false;
        }
    }, []);

    const verify = useCallback(async () => {
        setIsChecking(true);
        const online = await checkHealth();
        if (mountedRef.current) {
            setIsApiOnline(online);
            setIsChecking(false);
        }
    }, [checkHealth]);

    useEffect(() => {
        mountedRef.current = true;

        verify();

        const interval = setInterval(verify, CHECK_INTERVAL);

        return () => {
            mountedRef.current = false;
            clearInterval(interval);
        };
    }, [verify]);

    return {
        isApiOnline,
        isChecking,
        recheckApi: verify,
    };
}