import React, {useEffect, useRef} from 'react';

import {useAppTheme} from '@/constants/theme';
import {useRespirar} from './useRespirar';
import CheckinRespirar from '@/assets/icons/avatars/checkin-respirar.svg';
import {Paragraph} from "@/components/typography/Paragraph";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

const INSPIRE_TIME = 2500;
const EXHALE_TIME = 2500;
const HOLD_TIME = 1000;

export default function BreathAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const scale = useRef(new Animated.Value(0)).current;

    const {breathState, inicio, parar} = useRespirar(INSPIRE_TIME, HOLD_TIME, EXHALE_TIME, HOLD_TIME);

    useEffect(() => {
        if (playing) {
            inicio();
            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            parar();
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            parar();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, inicio, parar]);

    useEffect(() => {
        if (breathState === 'inspire') {
            Animated.timing(scale, {
                toValue: 1,
                duration: INSPIRE_TIME,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
        if (breathState === 'exhale') {
            Animated.timing(scale, {
                toValue: 0,
                duration: EXHALE_TIME,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }).start();
        }
    }, [breathState, scale]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {playing ? (
                    <View style={[styles.circleOutline, {borderColor: colors.primary}]}>
                        <Animated.View style={[
                            styles.circleFill, {backgroundColor: colors.primary},
                            {transform: [{scale: scale}]}
                        ]}/>
                    </View>
                ) : (
                    <CheckinRespirar width={150} height={150} style={{marginLeft: 25}} color={colors.primary}/>
                )}
            </View>

            <View style={{gap: 25, marginVertical: 25}}>
                <Paragraph align={"center"} weight={"bold"} size={24} color={colors.primary}>
                    Respire fundo{'\n'}
                    e pense em algo simples{'\n'}
                    que foi bom nos últimos dias.
                </Paragraph>
                {/*<Paragraph align={"center"} weight={"bold"} size={24} color={colors.primary}>*/}
                {/*    Algo que mereça{'\n'} ser lembrado.*/}
                {/*</Paragraph>*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {height: 150, justifyContent: 'center', alignItems: 'center', marginVertical: 20},
    circleOutline: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleFill: {height: 120, width: 120, borderRadius: 60},
    text: {fontWeight: 'bold', textAlign: 'center', fontSize: 20, lineHeight: 24, paddingTop: 15},
    subText: {fontWeight: 'bold', textAlign: 'center', fontSize: 20, lineHeight: 24, paddingTop: 30}
});