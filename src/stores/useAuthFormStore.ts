import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthFormState {
    lastEmail: string;
    setLastEmail: (email: string) => void;
    clearLastEmail: () => void;
}

export const useAuthFormStore = create<AuthFormState>()(
    persist(
        (set) => ({
            lastEmail: '',
            setLastEmail: (email: string) => set({ lastEmail: email }),
            clearLastEmail: () => set({ lastEmail: '' }),
        }),
        {
            name: 'auth-form-storage', // Nome único no AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);