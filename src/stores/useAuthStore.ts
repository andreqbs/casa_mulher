import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {secureStorage} from "@/services/storage/secureStorage";

interface AuthState {
    isAuthenticated: boolean;
    roles: string[];
    acceptedPolicy: boolean;
    lastLogin: number;
    userId: string;
    setAuthentication: (isAuthenticated: boolean) => void;
    includeRoles: (roles: string[]) => void;
    setAcceptedPolicy: (accepted: boolean) => void;
    setLastLogin: () => void;
    setUserId: (userId: string) => void;
    clear: () => void;
    phone: string;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            roles: [],
            acceptedPolicy: false,
            lastLogin: 0,
            userId: "",
            phone: "",

            setAuthentication: (isAuthenticated) => set({ isAuthenticated }),
            includeRoles: (roles) => set({ roles }),
            setAcceptedPolicy: (acceptedPolicy) => set({ acceptedPolicy }),

            setLastLogin: () => {
                const now = Date.now();
                const lastLogin = get().lastLogin;
                const expiry = lastLogin + 7 * 24 * 60 * 60 * 1000; // 7 dias

                if (lastLogin === 0 || now > expiry) {
                    set({ lastLogin: now, acceptedPolicy: false });
                } else {
                    set({ lastLogin: now });
                }
            },

            setUserId: (userId) => set({ userId }),

            clear: () =>
                set({
                    isAuthenticated: false,
                    roles: [],
                    acceptedPolicy: false,
                    lastLogin: 0,
                    userId: "",
                    phone: "",
                }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => secureStorage),
        }
    )
);
