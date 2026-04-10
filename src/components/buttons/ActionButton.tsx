import React from "react";
import { Paragraph } from "@src/components/typography/Paragraph";
import { useAppTheme } from "@/constants/theme";


type Props = {
    icon: React.ReactNode;
    label: string;
    action: () => void;
    borderColor: string;
    textColor: string;
    backgroundColor?: string;
};

export default function ActionButton({
                                         icon,
                                         label,
                                         action,
                                         borderColor,
                                         textColor,
                                         backgroundColor,
                                     }: Readonly<Props>) {
    const { colors } = useAppTheme();

    return (
        <TouchableOpacity
            onPress={action}
            activeOpacity={0.8}
            style={[
                styles.actionButton,
                {
                    backgroundColor: backgroundColor || colors.onPrimary,
                    borderColor,
                    height: buttonHeight,
                },
            ]}
        >
            <View style={styles.iconWrapper}>{icon}</View>

            <Paragraph
                size={13}
                align="center"
                color={textColor}
                lineHeight={16}
            >
                {label}
            </Paragraph>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        width: wp("42%"),
        borderWidth: 1.5,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("1%"),
        paddingVertical: hp("0.5%"),
    },

    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("0.5%"),
    },
});