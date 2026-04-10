import React, { createContext, useContext, useState } from "react";

type HeaderContextValue = {
    visible: boolean;
    setVisible: (v: boolean) => void;
    show: () => void;
    hide: () => void;
};

const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(true);

    const value: HeaderContextValue = {
        visible,
        setVisible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
    };

    return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

export const useHeader = (): HeaderContextValue => {
    const ctx = useContext(HeaderContext);
    if (!ctx) throw new Error("useHeader must be used within HeaderProvider");
    return ctx;
};
