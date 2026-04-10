import React, {useState} from "react";
import {ActivityIndicator, Modal, StyleSheet, View} from "react-native";
import {Paragraph} from "@/components/typography/Paragraph";
import {PrimaryButton} from "@/components/buttons/PrimaryButton";
import {useAppTheme} from "@/constants/theme";

interface ApiUnavailableModalProps {
    visible: boolean;
    onRetry: () => Promise<void>;
    title?: string;
    message?: string;
    subMessage?: string;
}

export function ApiUnavailableModal({
    visible,
    onRetry,
    title = "Serviço Indisponível",
    message = "Nosso servidor está temporariamente fora do ar. Estamos trabalhando para resolver o mais rápido possível.",
    subMessage = "Por favor, tente novamente em alguns instantes.",
}: Readonly<ApiUnavailableModalProps>) {
    const {colors} = useAppTheme();
    const [retrying, setRetrying] = useState(false);

    const handleRetry = async () => {
        setRetrying(true);
        await onRetry();
        setRetrying(false);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Paragraph size={20} weight="bold" align="center">
                        {title}
                    </Paragraph>

                    <View style={styles.content}>
                        <Paragraph size={16} style={styles.message} lineHeight={22}>
                            {message}
                        </Paragraph>

                        <Paragraph size={13} style={styles.subMessage} lineHeight={22}>
                            {subMessage}
                        </Paragraph>
                    </View>

                    {retrying ? (
                        <ActivityIndicator size="small" color={colors.tertiary} />
                    ) : (
                        <PrimaryButton
                            title="Tentar novamente"
                            onPress={handleRetry}
                            textColor={colors.onTertiary}
                            background={colors.tertiary}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    container: {
        width: "100%",
        maxWidth: 320,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 4},
        gap: 12,
    },
    content: {
        marginHorizontal: 35,
        gap: 10,
    },
    message: {
        textAlign: "center",
        color: "#555",
        marginBottom: 6,
    },
    subMessage: {
        textAlign: "center",
        color: "#777",
        marginBottom: 20,
    },
});
