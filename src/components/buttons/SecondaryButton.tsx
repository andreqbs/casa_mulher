import React from "react";
import {AppTheme} from "@/constants/theme";

type SecondaryButtonProps = {
    title: string;
    onPress: () => void;
    color?: string;
    textColor?: string;
    outlineColor?: boolean;
    disabled?: boolean;
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
                                                                    title,
                                                                    onPress,
                                                                    color,
                                                                    textColor,
                                                                    outlineColor = false,
                                                                    disabled = false
                                                                }) => {
    const {colors, fonts} = useTheme<AppTheme>();

    const backgroundColor = outlineColor
        ? colors.onPrimary
        : color ?? "#68A958";

    const disabledOpacity = disabled ? 0.5 : 1;

    return (
        <Button
            mode={outlineColor ? "outlined" : "contained"}
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor,
                opacity: disabledOpacity,
                borderRadius: 10,
                height: 50,
                justifyContent: "center",
                alignSelf: "stretch",
                borderColor: outlineColor ? colors.primary : undefined,
            }}
            labelStyle={{
                color: outlineColor ? colors.primary : colors.onPrimary,
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
