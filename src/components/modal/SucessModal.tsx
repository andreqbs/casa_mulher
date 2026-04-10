import React from "react";
import {Modal, StyleSheet, View} from "react-native";
import {Paragraph} from "@/components/typography/Paragraph";
import {PrimaryButton} from "@/components/buttons/PrimaryButton";

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
}

export function SuccessModal({
                                 visible,
                                 onClose,
                                 title = "✓ Sucesso!",
                                 message = "Sua avaliação foi registrada com sucesso!",
                                 buttonText = "OK",
                             }: SuccessModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Paragraph size={16} style={styles.title}>
                        {title}
                    </Paragraph>

                    <Paragraph size={14} style={styles.message}>
                        {message}
                    </Paragraph>

                    <PrimaryButton
                        title={buttonText}
                        onPress={onClose}
                    />
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
        backgroundColor: "#FEEEE2",
        borderWidth: 2,
        borderColor: "#F37335",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    title: {
        color: "#F37335",
        fontWeight: "700",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        width: 200,
        alignSelf: "center",
    },
});
