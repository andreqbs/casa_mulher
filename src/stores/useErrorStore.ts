import {create} from "zustand";

interface ErrorState {
    visible: boolean;
    message: string;
    status?: number;
    showError: (error: {message: string; status?: number}) => void;
    hideError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    visible: false,
    message: "",
    status: undefined,
    showError: ({message, status}) =>
        set({visible: true, message, status}),
    hideError: () => set({visible: false, message: "", status: undefined}),
}));
