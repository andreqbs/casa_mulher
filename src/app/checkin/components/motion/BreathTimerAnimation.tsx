import React, {useEffect, useRef, useState} from 'react';
import {useAppTheme} from '@/constants/theme';
import {useRespirar} from './useRespirar';
import CheckinRespirar from '@/assets/icons/avatars/checkin-respirar.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; color?: string; repeats?: number };

const INSPIRE_TIME = 6000;
const HOLD_TIME = 3000;
const EXHALE_TIME = 6000;

export default function BreathTimerAnimation({playing, onFinish, color, repeats}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const scale = useRef(new Animated.Value(0)).current;
    const [countCycles, setCountCycles] = useState<number>(0);
    const previousState = useRef<string | null>(null);
    const hasFinished = useRef(false);
    const {breathState, inicio, parar} = useRespirar(INSPIRE_TIME, HOLD_TIME, EXHALE_TIME, HOLD_TIME);
    const {xl} = useFontSizes()

    useEffect(() => {
        if (!playing) return;

        if (
            previousState.current === 'exhale' &&
            breathState === 'hold'
        ) {
            setCountCycles(prev => prev + 1);
        }

        previousState.current = breathState;
    }, [breathState, playing]);

    useEffect(() => {
        if (!repeats || hasFinished.current) return;

        if (countCycles >= repeats) {
            hasFinished.current = true;

            parar();
            if (intervalId.current) clearInterval(intervalId.current);

            onFinish(duration.current);
        }
    }, [countCycles, repeats]);

    useEffect(() => {
        if (playing) {
            hasFinished.current = false;
            setCountCycles(0);
            previousState.current = null;
            duration.current = 0;

            inicio();
            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            parar();
            if (intervalId.current) clearInterval(intervalId.current);
        }

        return () => {
            parar();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing]);


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

    const getBreathText = () => {
        switch (breathState) {
            case 'inspire':
                return 'Inspirando por 6 segundos.';
            case 'hold':
                return 'Segurando por 3 segundos.';
            case 'exhale':
                return 'Expirando por 6 segundos.';
            default:
                return '';
        }
    };

    return (
        <View style={styles.wrapper}>
            <CheckinRespirar width={120} height={120} style={{marginVertical: 10, marginLeft: 10}}
                             color={color || colors.primary}/>

            <Paragraph color={color || colors.primary} size={xl} align={'center'} weight={'bold'}>
                {playing && getBreathText()}
            </Paragraph>

            <View style={styles.animationContainer}>
                <View style={[styles.circleOutline, {borderColor: color || colors.primary}]}>
                    <Animated.View style={[
                        styles.circleFill,
                        {backgroundColor: color || colors.primary},
                        {transform: [{scale: scale}]}
                    ]}/>
                </View>
            </View>

            {(repeats && repeats > 0) && (
                <View>
                    <Paragraph color={color || colors.primary}>
                        Ciclos completados: {countCycles} / {repeats}
                    </Paragraph>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%', gap: 30},
    animationContainer: {height: 120, width: 120, alignItems: 'center', justifyContent: 'center'},
    circleOutline: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleFill: {height: 120, width: 120, borderRadius: 60}
});