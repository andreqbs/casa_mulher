import React, {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View,} from "react-native";
import {useAppTheme} from "@/constants/theme";
import {Paragraph} from "@/components/typography/Paragraph";
import HooyWhiteLogo from "@/assets/icons/hooy/hooy-000000.svg";
import {Calendar} from "@/components/Calendar";
import {useUserAuthStore} from "@/stores/useUserAuthStore";
import {useCheckinDiarioWeekByUserId} from "@/hooks/useCheckinDiarioWeekByUserId";
import MenuButtons from "@/components/layout/menu/MenuButtons";
import {useRouteTheme} from "@/contexts/RouteThemeContext";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {firstName} from "@/utils/profileUtils";

const {height} = Dimensions.get("window");

type MenuBottomSheetProps = {
    visible: boolean;
    onClose: () => void;
};

export const MenuBottomSheet: React.FC<MenuBottomSheetProps> = ({
                                                                    visible,
                                                                    onClose,
                                                                }) => {
    const {colors} = useAppTheme();
    const userStore = useUserAuthStore.getState();
    const {overrides, baseTheme} = useRouteTheme();
    const [showModal, setShowModal] = useState(visible);
    const translateY = useRef(new Animated.Value(height)).current;
    const {checkins} = useCheckinDiarioWeekByUserId(userStore.id);

    const borderColor = overrides.menuButtonBorderColor || baseTheme.colors.primary;
    const iconColor = overrides.menuButtonIconColor || baseTheme.colors.primary;
    const textColor = overrides.menuTextColor || baseTheme.colors.onPrimary;
    const textIconColor = overrides.menuButtonTextColor || baseTheme.colors.primary;

    const textColor3 = overrides.textCalendarCurrentDayColor || baseTheme.colors.onPrimary;
    const textColor2 = overrides.textCalendarOtherDaysColor || baseTheme.colors.primary;

    const bgCheckinColor = overrides.calendarCheckinColor || baseTheme.colors.checkInColor;
    const bgCurrentDayColor = overrides.calendarActiveColor || baseTheme.colors.primary;
    const bgOtherDays = overrides.calendarInactiveColor || baseTheme.colors.onPrimary;

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setShowModal(false);
            });
        }
    }, [visible]);

    if (!showModal) return null;

    const backgroundColor = overrides.primary || baseTheme.colors.primary;

    const handleWelcome = () => {
        const currentHour = new Date().getHours();
        const name = firstName(userStore.name);
        if (currentHour > 1 && currentHour < 12) {
            return `Bom dia, ${name}!`;
        } else if (currentHour >= 12 && currentHour < 18) {
            return `Boa tarde, ${name}!`;
        } else {
            return `Boa noite, ${name}!`;
        }
    }

    return (
        <Modal visible={showModal} transparent animationType="none" onRequestClose={onClose}>
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.backdrop}/>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[
                        styles.bottomSheet,
                        {
                            backgroundColor: backgroundColor || colors.primary,
                            transform: [{translateY}],
                        },
                    ]}
                    pointerEvents="auto"
                >
                    <ScrollView
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Paragraph size={20} color={textColor}>
                            {handleWelcome()}
                        </Paragraph>

                        <Calendar checkins={checkins} bgCheckinColor={bgCheckinColor}
                                  bgCurrentDayColor={bgCurrentDayColor} bgOtherDays={bgOtherDays} textColor={textColor3}
                                  textColor2={textColor2}/>

                        <View style={styles.scrollContent2}>
                            <View style={styles.grid}>
                                <MenuButtons borderColor={borderColor} iconColor={iconColor}
                                             textIconColor={textIconColor}/>
                            </View>
                        </View>

                        <View style={[styles.footerLogo]}>
                            <HooyWhiteLogo height={hp("5%")} color={colors.onPrimary}/>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        inset: 0,
    },
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: height * 0.69,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 10,
        paddingHorizontal: 28,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "flex-start",
        gap: 10,
    },
    scrollContent2: {
        alignItems: "center",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    footerLogo: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});