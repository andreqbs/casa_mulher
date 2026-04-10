import { configureFonts } from "react-native-paper";

export const fontConfig = {
    regular: {
        fontFamily: "SegoeUI-Regular",
        fontWeight: "400" as const,
    },
    semibold: {
        fontFamily: "SegoeUI-Regular",
        fontWeight: "600" as const,
    },
    bold: {
        fontFamily: "SegoeUI-Bold",
        fontWeight: "700" as const,
    },
};

export const FontSizes = {
    sm: 14,
    md: 16,
    lg: 20,
    xg: 26,
    xxl: 32,
    xxxl: 52,
};

export const customFonts = configureFonts({
    config: {
        displayLarge: fontConfig.bold,
        displayMedium: fontConfig.bold,
        displaySmall: fontConfig.bold,
        headlineLarge: fontConfig.bold,
        headlineMedium: fontConfig.bold,
        headlineSmall: fontConfig.bold,
        titleLarge: fontConfig.bold,
        titleMedium: fontConfig.bold,
        titleSmall: fontConfig.bold,
        labelLarge: fontConfig.regular,
        labelMedium: fontConfig.regular,
        labelSmall: fontConfig.regular,
        bodyLarge: fontConfig.regular,
        bodyMedium: fontConfig.regular,
        bodySmall: fontConfig.regular,
    },
});

export const Typography = {
    titleSmall: {
        ...fontConfig.bold,
        fontSize: FontSizes.sm,
    },
    titleMedium: {
        ...fontConfig.bold,
        fontSize: FontSizes.md,
    },
    titleLarge: {
        ...fontConfig.bold,
        fontSize: FontSizes.lg,
    },
    headlineLarge: {
        ...fontConfig.bold,
        fontSize: FontSizes.xg,
    },
    body: {
        ...fontConfig.regular,
        fontSize: FontSizes.md,
    },
    caption: {
        ...fontConfig.regular,
        fontSize: FontSizes.sm,
    },
};
