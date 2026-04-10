import React from "react";
import {Button, useTheme} from "react-native-paper";
import {AppTheme} from "@/constants/theme";

type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
    background?: string;
    textColor?: string;
    disabled?: boolean
    outlineColor?: boolean;
    borderColor?: string
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({title, onPress, background, textColor, disabled = false, outlineColor = false, borderColor}) => {
    const {colors, fonts} = useTheme<AppTheme>();

    return (
        <Button
            mode={outlineColor ? "outlined" : "contained"}
            onPress={onPress}
            disabled={disabled}
            maxFontSizeMultiplier={1.2}
            style={{
                backgroundColor: outlineColor ? colors.onPrimary : background || colors.primary,
                borderRadius: 10,
                height: 50,
                justifyContent: "center",
                alignSelf: "stretch",
                borderColor: outlineColor ? (borderColor ? borderColor : colors.primary) : undefined
            }}
            labelStyle={{
                color: outlineColor ? (textColor ? textColor : colors.primary) :  colors.onPrimary,
                fontSize: fonts.titleSmall.fontSize,
                fontFamily: fonts.titleSmall.fontFamily,
                textTransform: "none",
                borderColor: outlineColor ? colors.primary : "#000",
            }}
        >
            {title}
        </Button>
    );
};
