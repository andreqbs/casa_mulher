import React, { createContext, useContext } from 'react';
import {useInternetAvailability} from "@/hooks/useCheckConnection";

type InternetContextType = {
    isConnected: boolean;
    isLoading: boolean;
    recheckConnection: () => Promise<void>;
};

const InternetContext = createContext<InternetContextType | undefined>(undefined);

export const InternetProvider = ({ children }: { children: React.ReactNode }) => {
    const internet = useInternetAvailability();

    return (
        <InternetContext.Provider value={internet}>
            {children}
        </InternetContext.Provider>
    );
};

export const useInternet = () => {
    const context = useContext(InternetContext);
    if (!context) {
        throw new Error('useInternet must be used within InternetProvider');
    }
    return context;
};
