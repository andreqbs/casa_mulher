import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import Svg, {Circle} from 'react-native-svg';
import CheckinSilencio from '@/assets/icons/avatars/checkin-silencio.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

const TWO_MINUTES_MS = 2 * 60 * 1000;
const CIRCLE_SIZE = 120;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const timerString = (minutes: number, seconds: number) => {
    const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${strMinutes}:${strSeconds}`;
};

export default function TimerAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xl, md} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const [timerLabel, setTimerLabel] = useState('00:00');
    const progress = useRef(new Animated.Value(0)).current; // 0 (início) a 1 (fim)

    useEffect(() => {
        let animation: Animated.CompositeAnimation;

        if (playing) {
            animation = Animated.timing(progress, {
                toValue: 1,
                duration: TWO_MINUTES_MS,
                easing: Easing.linear,
                useNativeDriver: true,
            });
            animation.start();

            intervalId.current = setInterval(() => {
                duration.current += 1;

                const minutes = Math.floor(duration.current / 60);
                const seconds = duration.current % 60;
                setTimerLabel(timerString(minutes, seconds));

                if (duration.current >= 120) {
                    if (intervalId.current) clearInterval(intervalId.current);
                    onFinish(duration.current);
                }
            }, 1000);
        } else {
            progress.stopAnimation();
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }

        return () => {
            progress.stopAnimation();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, progress]);

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [CIRCUMFERENCE, 0]
    });

    return (
        <View style={styles.wrapper}>
            <CheckinSilencio width={120} height={120} style={{marginVertical: 20, marginLeft: 10}}/>
            <Paragraph color={colors.primary} align={'center'} weight={'bold'} size={20}>
                Sente-se por 2 minutos{'\n'}
                em silêncio, sem música,{'\n'}
                sem distração.
            </Paragraph>

            <View style={styles.timerContainer}>
                <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
                    <Circle
                        cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r={RADIUS}
                        strokeWidth={STROKE_WIDTH}
                        stroke={colors.surfaceVariant}
                        fill="none"
                    />
                    <AnimatedCircle
                        cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r={RADIUS}
                        strokeWidth={STROKE_WIDTH}
                        stroke={colors.primary}
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform={[{rotateZ: '-90deg'}]}
                        fill="none"
                    />
                </Svg>

                <Paragraph color={colors.primary} align={'center'} weight={'bold'} size={md}>
                    {timerLabel}
                </Paragraph>
            </View>

            <Paragraph color={colors.primary} align={'center'} weight={'bold'} size={xl}>
                Apenas respire e observe.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%', gap: 25},
    subText: {fontWeight: 'bold', textAlign: 'center', fontSize: 20, lineHeight: 24, marginTop: 15},
    timerContainer: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 10
    },
});