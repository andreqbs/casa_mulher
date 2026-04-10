import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import {registerForPushNotificationsAsync} from "@/utils/registerForPushNotificationsAsync";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authService} from "@/services/auth/authService";

interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

// Chave para armazenar notificação pendente
const PENDING_NOTIFICATION_KEY = "@hooy:pending_notification";

interface PendingNotification {
    title: string;
    message: string;
    data: any;
    timestamp: number;
}

/**
 * NotificationProvider refatorado
 *
 * Integrado corretamente com o sistema de autenticação:
 * - Usa authService.isAuthenticated() ao invés de AsyncStorage incorreto
 * - Salva notificações quando usuário não está logado
 * - Processa notificações pendentes após login
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
                                                                              children,
                                                                          }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] =
        useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const notificationListener = useRef<Notifications.EventSubscription | null>(null);
    const responseListener = useRef<Notifications.EventSubscription | null>(null);
    const lastProcessedNotificationId = useRef<string | null>(null);

    /**
     * Salva notificação pendente para processar após login
     */
    const savePendingNotification = async (
        title: string,
        message: string,
        data: any
    ) => {
        try {
            const pendingNotification: PendingNotification = {
                title,
                message,
                data,
                timestamp: Date.now(),
            };

            await AsyncStorage.setItem(
                PENDING_NOTIFICATION_KEY,
                JSON.stringify(pendingNotification)
            );

        } catch (error) {
            console.error("❌ Erro ao salvar notificação pendente:", error);
        }
    };

    /**
     * Processa notificação pendente (chamado após login bem-sucedido)
     */
    const processPendingNotification = async () => {
        try {
            const pendingData = await AsyncStorage.getItem(PENDING_NOTIFICATION_KEY);

            if (!pendingData) {
                return;
            }

            const pending: PendingNotification = JSON.parse(pendingData);

            // Verificar se a notificação não está muito antiga (24 horas)
            const isExpired = Date.now() - pending.timestamp > 24 * 60 * 60 * 1000;

            if (isExpired) {
                await AsyncStorage.removeItem(PENDING_NOTIFICATION_KEY);
                return;
            }


            // Navegar para tela de notificação
            router.push({
                pathname: "/(tabs)/push-notification",
                params: {
                    title: pending.title || "Hooy",
                    message: pending.message,
                },
            });

            // Limpar notificação pendente após processar
            await AsyncStorage.removeItem(PENDING_NOTIFICATION_KEY);
        } catch (error) {
            console.error("❌ Erro ao processar notificação pendente:", error);
        }
    };

    /**
     * Verifica se o usuário está autenticado
     * USANDO O SERVIÇO CORRETO (authService)
     */
    const checkUserAuthentication = async (): Promise<boolean> => {
        try {
            // ✅ CORRETO: Usa authService que verifica secureStorage
            const isAuthenticated = await authService.isAuthenticated();
            return isAuthenticated;
        } catch (error) {
            console.error("❌ Erro ao verificar autenticação:", error);
            return false;
        }
    };

    /**
     * Manipula resposta da notificação (quando usuário toca nela)
     */
    const handleNotificationResponse = async (
        response: Notifications.NotificationResponse
    ) => {
        try {
            // Evita processar a mesma notificação duas vezes
            // (pode acontecer quando getLastNotificationResponseAsync e o listener disparam juntos)
            const notificationId = response.notification.request.identifier;
            if (notificationId === lastProcessedNotificationId.current) {
                return;
            }
            lastProcessedNotificationId.current = notificationId;

            const data = response.notification.request.content.data;
            const title = response.notification.request.content.title;
            const body = response.notification.request.content.body;

            if (!data && !body) {
                console.warn("⚠️ Notificação sem dados ou corpo");
                return;
            }

            const message = (data?.message as string) || (body as string) || "";
            const notificationTitle = (title as string) || "Hooy";


            const isAuthenticated = await checkUserAuthentication();

            if (isAuthenticated) {

                router.push({
                    pathname: "/(tabs)/push-notification",
                    params: {
                        title: notificationTitle,
                        message: message,
                    },
                });
            } else {

                // Usuário não logado: salvar e redirecionar para login
                await savePendingNotification(notificationTitle, message, data);

                router.push({
                    pathname: "/login", // Ajuste para sua rota de login
                    params: {
                        redirect: "notification",
                    },
                });
            }
        } catch (error) {
            console.error("❌ Erro ao manipular resposta de notificação:", error);
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => {
                if (token) {
                    setExpoPushToken(token);
                    console.log("📱 Expo Push Token:", token);
                }
            })
            .catch((err) => {
                console.error("❌ Erro ao registrar notificações:", err);
                setError(err);
            });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                handleNotificationResponse
            );

        // Cold start: captura a notificação que abriu o app quando ele estava morto.
        // O listener acima pode não estar registrado a tempo nesse cenário.
        Notifications.getLastNotificationResponseAsync().then((response) => {
            if (response) {
                handleNotificationResponse(response);
            }
        });

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                expoPushToken,
                notification,
                error,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

/**
 * Função exportada para processar notificação pendente
 * Deve ser chamada após login bem-sucedido.
 * Retorna true se havia notificação pendente e a navegação foi feita.
 */
export const processPendingNotification = async (): Promise<boolean> => {
    try {
        const pendingData = await AsyncStorage.getItem(PENDING_NOTIFICATION_KEY);

        if (!pendingData) {
            return false;
        }

        const pending: PendingNotification = JSON.parse(pendingData);

        // Verificar expiração (24 horas)
        const isExpired = Date.now() - pending.timestamp > 24 * 60 * 60 * 1000;

        if (isExpired) {
            await AsyncStorage.removeItem(PENDING_NOTIFICATION_KEY);
            return false;
        }

        // Limpar antes de navegar para evitar duplicação
        await AsyncStorage.removeItem(PENDING_NOTIFICATION_KEY);

        // Usar replace para substituir a tela de login no stack
        router.replace({
            pathname: "/(tabs)/push-notification",
            params: {
                title: pending.title || "Hooy",
                message: pending.message,
            },
        });

        return true;
    } catch (error) {
        console.error("❌ Erro ao processar notificação pendente:", error);
        return false;
    }
};