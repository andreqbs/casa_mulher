type AppEvent = 'FORCE_UPDATE';

const listeners = new Set<(event: AppEvent) => void>();

export const appEvents = {
    emit(event: AppEvent) {
        listeners.forEach(listener => listener(event));
    },

    subscribe(listener: (event: AppEvent) => void) {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    }
};