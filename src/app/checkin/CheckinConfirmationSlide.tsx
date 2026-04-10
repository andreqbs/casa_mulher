import React from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import {LinearGradient} from 'expo-linear-gradient';

import HooyLogoWhite from '@/assets/icons/hooy/hooy-logo-white.svg';
import AvatarCheckin from '@/assets/icons/avatars/boneco-checkin.svg';
import {CHECKIN_CONTENT_RESULT_MAP, CheckinContentResult,} from '@/app/checkin/data/checkinContentResult';
import {Heading} from '@/components/typography/Heading';
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useUserById} from "@/hooks/useUserById";
import {useUserAuthStore} from "@/stores/useUserAuthStore";
import {ROUTES} from "@/constants/Routes";
import NewHeader from "@/components/layout/NewHeader";
import {SafeAreaView} from "react-native-safe-area-context";
import {Appbar} from 'react-native-paper';
import {appStorage} from "@/services/storage/appStorage";
import {StorageKeys} from "@/config/storageKeys";

export default function CheckinConfirmationSlide() {
    const {colors} = useAppTheme();
    const userStore = useUserAuthStore.getState();
    const {profile} = useUserById(userStore.id);
    const {id} = useLocalSearchParams();
    const checkinId = Number(id) || 1;

//TODO ver errros aqui do data quando faz o cadastr e vem pro checkin!
    function getRandomCheckinResult(): CheckinContentResult {
        const allMessages = Object.values(CHECKIN_CONTENT_RESULT_MAP);
        return allMessages[checkinId - 1];
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                handleGoHome();
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [profile?.trialDays])
    );


    async function handleGoHome() {
        try {
            const value = await appStorage.getItem(StorageKeys.CURRENT_CHECKIN_NUMBER);
            const parsedValue = Number(value);
            if (parsedValue < 16) {
                await appStorage.increment(StorageKeys.CURRENT_CHECKIN_NUMBER);
            }
            else
                await appStorage.setItem(StorageKeys.CURRENT_CHECKIN_NUMBER, '1');

            if (Number(profile.trialDays) === 0) {
                router.replace(ROUTES.NOVO_USUARIO);
            } else {
                router.replace(ROUTES.CALENDAR);
            }

        } catch (error) {
            console.warn("Erro ao incrementar checkin:", error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#FF8C1A', '#FF7518', '#FF5E13']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={StyleSheet.absoluteFillObject}
            />

            <NewHeader color={colors.onPrimary} backgroundColor={"transparent"} showBack={false} right={
                <Appbar.Action
                    icon="close"
                    color={colors.onPrimary}
                    size={35}
                    onPress={() => handleGoHome()}
                />
            }/>

            <View
                style={styles.content}>
                <AvatarCheckin/>

                <Heading
                    text={getRandomCheckinResult().data}
                    align="center"
                    color={colors.onPrimary}
                    size={34}
                />

                <View style={styles.footerLogo}>
                    <HooyLogoWhite width={100} height={100}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    footerLogo: {
        marginTop: 10,
    },
});
