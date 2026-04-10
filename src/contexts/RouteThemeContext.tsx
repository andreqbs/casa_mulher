import React, {createContext, ReactNode, useContext} from 'react';
import {AppTheme} from '@/constants/theme';

export type RouteThemeOverrides = {
    primary?: string;
    onPrimary?: string;
    surface?: string;
    calendarCheckinColor?: string;
    calendarActiveColor?: string;
    calendarInactiveColor?: string;
    textCalendarCurrentDayColor?: string;
    textCalendarOtherDaysColor?: string;
    menuButtonBorderColor?: string;
    menuButtonIconColor?: string;
    menuButtonTextColor?: string;
    menuTextColor?: string;
    gradientStart?: string;
    gradientMid?: string;
    gradientEnd?: string;
};

type RouteThemeContextType = {
    overrides: RouteThemeOverrides;
    baseTheme: AppTheme;
};

export const RouteThemeContext = createContext<RouteThemeContextType | undefined>(undefined);

export const useRouteTheme = () => {
    const context = useContext(RouteThemeContext);
    if (!context) {
        throw new Error('useRouteTheme must be used within RouteThemeProvider');
    }
    return context;
};

type RouteThemeProviderProps = {
    children: ReactNode;
    overrides: RouteThemeOverrides;
    baseTheme: AppTheme;
};

export const RouteThemeProvider: React.FC<RouteThemeProviderProps> = ({
                                                                          children,
                                                                          overrides,
                                                                          baseTheme
                                                                      }) => {
    return (
        <RouteThemeContext.Provider value={{overrides, baseTheme}}>
            {children}
        </RouteThemeContext.Provider>
    );
};

export const useRouteColor = (
    overrideKey: keyof RouteThemeOverrides,
    fallbackThemeKey?: keyof AppTheme['colors']
): string => {
    const {overrides, baseTheme} = useRouteTheme();

    const overrideValue = overrides[overrideKey];
    if (overrideValue) return overrideValue;

    if (fallbackThemeKey) {
        return baseTheme.colors[fallbackThemeKey] as string;
    }

    return baseTheme.colors.primary;
};