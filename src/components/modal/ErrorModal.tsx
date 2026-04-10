import React from "react";
import {useErrorStore} from "@/stores/useErrorStore";
import {useAppTheme} from "@/constants/theme";

export function ErrorModal() {
    const {visible, message, hideError} = useErrorStore();
    const {colors} = useAppTheme();

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.card, {backgroundColor: colors.surface}]}>
                    <Text style={[styles.title, {color: colors.error}]}>
                        Erro {""}
                    </Text>
                    <Text style={[styles.message, {color: colors.onSurface}]}>
                        {message}
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: colors.primary}]}
                        onPress={hideError}>
                        <Text style={{color: colors.onPrimary, fontWeight: "bold"}}>
                            OK
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
        width: "80%",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
});
