import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useAppTheme } from '@/constants/theme';
import Cloud1 from '@/assets/icons/utilities/cloud-1.svg';
import Cloud2 from '@/assets/icons/utilities/cloud-2.svg';
import Cloud3 from '@/assets/icons/utilities/cloud-3.svg';
import Cloud4 from '@/assets/icons/utilities/cloud-4.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function WatchThoughtsAnimation({ playing, onFinish }: Readonly<Props>) {
    const { colors } = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;
    const anim3 = useRef(new Animated.Value(0)).current;
    const anim4 = useRef(new Animated.Value(0)).current;

    const loop1 = Animated.loop(Animated.timing(anim1, { toValue: 1, duration: 12000, easing: Easing.linear, useNativeDriver: false }));
    const loop2 = Animated.loop(Animated.timing(anim2, { toValue: 1, duration: 10000, delay: 2000, easing: Easing.linear, useNativeDriver: false }));
    const loop3 = Animated.loop(Animated.timing(anim3, { toValue: 1, duration: 14000, delay: 5000, easing: Easing.linear, useNativeDriver: false }));
    const loop4 = Animated.loop(Animated.timing(anim4, { toValue: 1, duration: 10000, delay: 6000, easing: Easing.linear, useNativeDriver: false }));

    useEffect(() => {
        if (playing) {
            loop1.start();
            loop2.start();
            loop3.start();
            loop4.start();

            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            loop1.stop();
            loop2.stop();
            loop3.stop();
            loop4.stop();
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            loop1.stop();
            loop2.stop();
            loop3.stop();
            loop4.stop();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, loop1, loop2, loop3, loop4]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.animationContainer}>
                <Animated.View style={[styles.cloud, { width: '40%', top: 60, left: anim4.interpolate({ inputRange: [0, 1], outputRange: ['-40%', '120%'] }) }]}>
                    <Cloud4 width="100%" />
                </Animated.View>
                <Animated.View style={[styles.cloud, { width: '40%', top: 0, left: anim2.interpolate({ inputRange: [0, 1], outputRange: ['-40%', '120%'] }) }]}>
                    <Cloud2 width="100%" />
                </Animated.View>
                <Animated.View style={[styles.cloud, { width: '80%', top: 100, left: anim3.interpolate({ inputRange: [0, 1], outputRange: ['-80%', '120%'] }) }]}>
                    <Cloud3 width="100%" />
                </Animated.View>
                <Animated.View style={[styles.cloud, { width: '40%', top: 150, left: anim1.interpolate({ inputRange: [0, 1], outputRange: ['-40%', '120%'] }) }]}>
                    <Cloud1 width="100%" />
                </Animated.View>
            </View>

            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Feche os olhos e{'\n'}
                imagine: sua mente é{'\n'}
                como o céu. Os pensamentos{'\n'}
                vão passando como nuvens.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', width: '100%' },
    animationContainer: { width: '100%', height: 240, position: 'relative', overflow: 'hidden', marginBottom: 20 },
    cloud: { position: 'absolute' },
});