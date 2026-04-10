import { create } from "zustand";
import {StartupState} from "@/interfaces/Startup";

interface StartupActions {
    confirmarAlertaPrivacidade: (confirmado: boolean) => void;
    confirmarTourInicial: (realizado: boolean) => void;
    registrarSePrimeiroLoginDoUsuario: (primeiro: boolean) => void;
    clear: () => void;
}

export const useStartupStore = create<StartupState & StartupActions>((set) => ({
    alertaPrivacidadeConfirmado: false,
    tourInicialRealizado: false,
    primeiroLoginDoUsuario: true,

    confirmarAlertaPrivacidade: (confirmado) =>
        set({ alertaPrivacidadeConfirmado: confirmado }),

    confirmarTourInicial: (realizado) =>
        set({ tourInicialRealizado: realizado }),

    registrarSePrimeiroLoginDoUsuario: (primeiro) =>
        set({ primeiroLoginDoUsuario: primeiro }),

    clear: () =>
        set({
            alertaPrivacidadeConfirmado: false,
            tourInicialRealizado: false,
            primeiroLoginDoUsuario: true,
        }),
}));
