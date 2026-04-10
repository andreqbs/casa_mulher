import { MD3DarkTheme, MD3LightTheme, MD3Theme, useTheme } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import {customFonts} from "@/constants/Fonts";

export type AppTheme = MD3Theme & {
    colors: MD3Theme["colors"] & {
        gradientStart: string;
        gradientMid: string;
        gradientEnd: string;
        onboardingBackground: string
        onboardingButtonBackground: string
        textTertiary: string;
        breathColor: string;
        breathColorActivity: string
        checkInColor: string;
        textQuarter: string;
    };
};

export const lightTheme: AppTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: Colors.light.primary,
        // secondary: Colors.light.buttonBgSecondary,
        // tertiary: Colors.light.buttonBgTertiary,
        onPrimary: Colors.light.onPrimary,
        background: Colors.light.background,
        // backgroundPrimary: Colors.light.backgroundPrimary,
        // backgroundOrange: Colors.light.backgroundTextInput,
        // onBackground: Colors.light.textPrimary,
        surface: Colors.light.surface,
        // onSurface: Colors.light.textPrimary,
        // textPrimary: Colors.light.textPrimary,
        // textSecondary: Colors.light.textSecondary,
        tertiary: Colors.light.tertiary,
        onTertiary: Colors.light.onTertiary,
        textTertiary: Colors.light.textTertiary,
        onboardingBackground: Colors.light.onboardingBackground,
        onboardingButtonBackground: Colors.light.onboardingButtonBackground,
        secondary: Colors.light.onboardingTextSecondary,
        gradientStart: Colors.light.gradientGreen.start,
        gradientMid: Colors.light.gradientGreen.mid,
        gradientEnd: Colors.light.gradientGreen.end,
        breathColor: Colors.light.breathColor,
        breathColorActivity: Colors.light.breathColorActivity,
        checkInColor: Colors.light.checkInColor,
        textQuarter: Colors.light.textQuarter,
    },
    fonts: customFonts,
    roundness: 8,
    version: 3,
    isV3: true,
};

export const darkTheme: AppTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: Colors.dark.tint,
        background: Colors.dark.background,
        surface: Colors.dark.background,
        // onSurfaceVariant: Colors.dark.icon,
        // backgroundOrange: Colors.dark.background,
        // backgroundPrimary: Colors.dark.background,
        // textPrimary: "#ffffff",
        // textSecondary: "#cccccc",
        textTertiary: Colors.light.textTertiary,
        onboardingBackground: Colors.light.onboardingBackground,
        onboardingButtonBackground: Colors.light.onboardingButtonBackground,
        gradientStart: "#333333",
        gradientMid: "#222222",
        gradientEnd: "#000000",
        breathColor: Colors.light.breathColor,
        breathColorActivity: Colors.light.breathColorActivity,
        checkInColor: Colors.light.checkInColor,
        textQuarter: Colors.light.textQuarter,
    },
    fonts: customFonts,
    roundness: 8,
    version: 3,
    isV3: true,
    animation: { scale: 1 },
};

export const useAppTheme = () => useTheme<AppTheme>();
