import { create } from 'zustand';

interface ModalConfig {
    title?: string;
    message: string;
    buttonText?: string;
    onClose?: () => void;
}

interface ModalState {
    visible: boolean;
    type: 'success' | 'error' | null;
    title: string;
    message: string;
    buttonText: string;
    status?: number;
    onClose?: () => void;

    showSuccessModal: (config: ModalConfig) => void;
    showErrorModal: (config: ModalConfig & { status?: number }) => void;
    hideModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
    visible: false,
    type: null,
    title: '',
    message: '',
    buttonText: 'OK',
    status: undefined,
    onClose: undefined,

    showSuccessModal: ({ title, message, buttonText, onClose }) => {
        set({
            visible: true,
            type: 'success',
            title: title || 'Sucesso!',
            message,
            buttonText: buttonText || 'OK',
            onClose
        });
    },

    showErrorModal: ({ title, message, buttonText, status, onClose }) => {
        set({
            visible: true,
            type: 'error',
            title: title || `Erro ${status || ''}`,
            message,
            buttonText: buttonText || 'OK',
            status,
            onClose
        });
    },

    hideModal: () => {
        const state = get(); // get() retorna o estado atual da store
        set({ visible: false });

        // Executa callback após um pequeno delay para garantir que o modal fechou
        if (state.onClose) {
            setTimeout(() => {
                state.onClose?.();
            }, 300); // 300ms corresponde à animação do modal
        }
    },
}));