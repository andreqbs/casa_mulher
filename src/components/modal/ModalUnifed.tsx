import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Paragraph } from "@/components/typography/Paragraph";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useModalStore } from "@/stores/useModalStore";
import { useAppTheme } from "@/constants/theme";

export function UnifiedModal() {
    const { visible, type, title, message, buttonText, hideModal } = useModalStore();
    const { colors } = useAppTheme();

    const isSuccess = type === 'success';

    const boxStyle = isSuccess
        ? { backgroundColor: "#FEEEE2", borderColor: "#F37335" }
        : { backgroundColor: colors.surface, borderColor: colors.error };

    const titleColor = isSuccess ? "#F37335" : colors.error;
    const iconName = isSuccess ? "check-circle" : "close-circle";
    const iconColor = isSuccess ? "#F37335" : colors.error;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.box, boxStyle]}>
                    <MaterialCommunityIcons
                        name={iconName}
                        size={64}
                        color={iconColor}
                        style={styles.icon}
                    />

                    <Paragraph size={16} color={titleColor} weight={"bold"} align={"center"}>
                        {title}
                    </Paragraph>

                    <Paragraph size={14} style={styles.message}>
                        {message}
                    </Paragraph>

                    <PrimaryButton title={buttonText} onPress={hideModal} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 30,
    },
    box: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
});