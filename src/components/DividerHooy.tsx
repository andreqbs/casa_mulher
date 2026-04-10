import {StyleSheet, View} from "react-native";
import {useAppTheme} from "@/constants/theme";

interface DividerHooyProps {
    backgroundColor?: string;
}

export function DividerHooy({backgroundColor}: DividerHooyProps) {

    const {colors} = useAppTheme();
    return (
        <View style={[styles.divider, {backgroundColor: backgroundColor || colors.primary}]}/>
    )
}

const styles = StyleSheet.create({
    divider: {height: 1, width: '80%', opacity: 0.5, marginVertical: 15},
});