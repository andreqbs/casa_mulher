import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import ScanIcon from '@/assets/icons/avatars/checkin-scan-olhos-fechados.svg';
import ScanBar from '@/assets/icons/utilities/barra-scan.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function ScanAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const animValue = useRef(new Animated.Value(0)).current;

    const loop = Animated.loop(
        Animated.sequence([
            Animated.timing(animValue, {
                toValue: 1, duration: 15000, easing: Easing.linear, useNativeDriver: false
            }),
            Animated.timing(animValue, {
                toValue: 0, duration: 15000, easing: Easing.linear, useNativeDriver: false
            })
        ])
    );

    const animatedStyle = {
        position: 'absolute' as 'absolute',
        top: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '90%']
        }),
        left: 0,
        opacity: 0.8,
    };

    useEffect(() => {
        if (playing) {
            loop.start();
            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            loop.stop();
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            loop.stop();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, loop]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <ScanIcon width={150} height={150}/>
                {playing && (
                    <Animated.View style={animatedStyle}>
                        <ScanBar width={150}/>
                    </Animated.View>
                )}
            </View>

            <View style={{gap: 25, marginVertical: 25}}>
                <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                    Feche os olhos e faça um{'\n'}
                    escaneamento rápido do corpo,{'\n'}
                    dos pés à cabeça.
                </Paragraph>
                <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                    Apenas observe, sem julgar.
                </Paragraph>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 20, position: 'relative', width: 145, alignItems: 'center'},
});