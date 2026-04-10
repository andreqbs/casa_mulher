import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserAuthInfo } from "@/interfaces/UserAuth";

interface UserAuthState extends UserAuthInfo {
    setInfo: (info: Omit<UserAuthInfo, "expired">) => void;
    clear: () => void;
    setLatestCheckin: (checkin: any) => void;
}

export const useUserAuthStore = create<UserAuthState>()(
    persist(
        (set) => ({
            id: "",
            trial: false,
            trialDaysLeft: 0,
            paymentStatus: "",
            plan: "",
            email: "",
            name: "",
            latestCheckin: null,
            trialStartDate: "",
            expired: false,
            monthOneActionDone: 0,
            monthOneReflectionDone: 0,
            monthOneExperienceDone: 0,
            notificationsEnabled: true,
            appFirstAccessCompleted: false,
            signupSource: "",
            phone: "",

            setInfo: (info) => {
                const now = new Date();
                const trialEnd = new Date(info.trialStartDate);
                trialEnd.setDate(trialEnd.getDate() + 30);

                set({
                    ...info,
                    expired: now >= trialEnd,
                });
            },

            clear: () =>
                set({
                    id: "",
                    trial: false,
                    trialDaysLeft: 0,
                    paymentStatus: "",
                    plan: "",
                    email: "",
                    name: "",
                    latestCheckin: null,
                    expired: false,
                    trialStartDate: "",
                    monthOneActionDone: 0,
                    monthOneReflectionDone: 0,
                    monthOneExperienceDone: 0,
                    phone: "",
                }),

            setLatestCheckin: (checkin) => set({ latestCheckin: checkin }),
        }),
        {
            name: "user-auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
