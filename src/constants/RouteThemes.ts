import { Colors } from '@/constants/Colors';

type RouteThemeOverrides = {
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

export const ROUTE_THEME_OVERRIDES: Record<string, RouteThemeOverrides> = {
    '/breath': {
        primary: '#34918A',
        onPrimary: '#FFFFFF',
        surface: '#5BB9BC',
        calendarCheckinColor: '#7FC9C4',
        calendarActiveColor: '#34918A',
        calendarInactiveColor: '#FFFFFF',
        textCalendarCurrentDayColor: '#FFFFFF',
        textCalendarOtherDaysColor: '#34918A',
        menuButtonBorderColor: 'rgba(255, 255, 255, 0.3)',
        menuButtonIconColor: '#34918A',
        menuButtonTextColor: '#34918A',
        menuTextColor: '#FFFFFF',
        gradientStart: '#A0E7E9',
        gradientMid: '#72D3D6',
        gradientEnd: '#4BA8AB',
    },
    '/breath/breathActivity': {
        primary: Colors.light.breathColor,
        onPrimary: '#FFFFFF',
        surface: '#5BB9BC',
        calendarActiveColor: '#A0E7E9',
        calendarInactiveColor: '#E0F7F8',
        menuButtonBorderColor: 'rgba(255, 255, 255, 0.3)',
        menuButtonIconColor: '#FFFFFF',
        menuButtonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF',
        gradientStart: '#A0E7E9',
        gradientMid: '#72D3D6',
        gradientEnd: '#4BA8AB',
    },
};

export const getRouteThemeOverrides = (pathname: string): RouteThemeOverrides => {
    return ROUTE_THEME_OVERRIDES[pathname] || {};
};