import React from "react";
import {AppTheme} from "@/constants/theme";

type OutlinedButtonProps = {
    title: string;
    onPress: () => void;
    background?: string;
    textColor?: string;
    disabled?: boolean
    outlineColor?: boolean;
    borderColor?: string;

};

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({title, onPress, background, textColor, disabled = false, borderColor}) => {
    const {colors, fonts} = useTheme<AppTheme>();

    return (
        <Button
            mode={"outlined"}
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: background || colors.onPrimary,
                borderRadius: 50,
                height: 50,
                justifyContent: "center",
                alignSelf: "stretch",
                borderColor:  borderColor || colors.onPrimary || "#000",
            }}
            labelStyle={{
                color: textColor || "#FFFFFF",
                fontSize: fonts.titleSmall.fontSize,
                fontFamily: fonts.titleSmall.fontFamily,
                textTransform: "none",
                borderColor: borderColor || colors.onPrimary,
            }}
        >
            {title}
        </Button>
    );
};
