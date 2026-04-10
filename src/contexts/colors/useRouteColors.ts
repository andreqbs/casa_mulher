import { usePathname } from 'expo-router';
import { useAppTheme } from '@/constants/theme';
import { getRouteThemeOverrides } from '@/constants/RouteThemes';
import { useContext } from 'react';
import { RouteThemeContext } from '@/contexts/RouteThemeContext';

type RouteColors = {
    primary: string;
    onPrimary: string;
    menuButtonBorderColor: string;
    menuButtonIconColor: string;
    menuButtonTextColor: string;
    menuTextColor: string;
    calendarCheckinColor: string;
    calendarActiveColor: string;
    calendarInactiveColor: string;
    textCalendarCurrentDayColor: string;
    textCalendarOtherDaysColor: string;
};

/**
 * Hook universal que funciona DENTRO ou FORA do RouteThemeProvider
 * - Se estiver dentro do Provider: usa os overrides do contexto
 * - Se estiver fora do Provider: detecta a rota e busca os overrides
 */
export const useRouteColors = (): RouteColors => {
    const pathname = usePathname();
    const baseTheme = useAppTheme();

    const context = useContext(RouteThemeContext);

    if (context) {
        const { overrides, baseTheme: contextTheme } = context;
        return {
            primary: overrides.primary || contextTheme.colors.primary,
            onPrimary: overrides.onPrimary || contextTheme.colors.onPrimary,
            menuButtonBorderColor: overrides.menuButtonBorderColor || contextTheme.colors.primary,
            menuButtonIconColor: overrides.menuButtonIconColor || contextTheme.colors.primary,
            menuButtonTextColor: overrides.menuButtonTextColor || contextTheme.colors.primary,
            menuTextColor: overrides.menuTextColor || contextTheme.colors.onPrimary,
            calendarCheckinColor: overrides.calendarCheckinColor || "#FFCC2A",
            calendarActiveColor: overrides.calendarActiveColor || contextTheme.colors.primary,
            calendarInactiveColor: overrides.calendarInactiveColor || contextTheme.colors.onPrimary,
            textCalendarCurrentDayColor: overrides.textCalendarCurrentDayColor || contextTheme.colors.onPrimary,
            textCalendarOtherDaysColor: overrides.textCalendarOtherDaysColor || contextTheme.colors.primary,
        };
    }

    const overrides = getRouteThemeOverrides(pathname);

    return {
        primary: overrides.primary || baseTheme.colors.primary,
        onPrimary: overrides.onPrimary || baseTheme.colors.onPrimary,
        menuButtonBorderColor: overrides.menuButtonBorderColor || baseTheme.colors.primary,
        menuButtonIconColor: overrides.menuButtonIconColor || baseTheme.colors.primary,
        menuButtonTextColor: overrides.menuButtonTextColor || baseTheme.colors.primary,
        menuTextColor: overrides.menuTextColor || baseTheme.colors.onPrimary,
        calendarCheckinColor: overrides.calendarCheckinColor || "#FFCC2A",
        calendarActiveColor: overrides.calendarActiveColor || baseTheme.colors.primary,
        calendarInactiveColor: overrides.calendarInactiveColor || baseTheme.colors.onPrimary,
        textCalendarCurrentDayColor: overrides.textCalendarCurrentDayColor || baseTheme.colors.onPrimary,
        textCalendarOtherDaysColor: overrides.textCalendarOtherDaysColor || baseTheme.colors.primary,
    };
};