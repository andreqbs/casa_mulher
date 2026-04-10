import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import GlassIcon from '@/assets/icons/utilities/glass.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = {
    playing: boolean;
    onFinish: (duration: number) => void;
};

export default function GlassAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const animValue = useRef(new Animated.Value(0)).current;

    const loop = Animated.loop(
        Animated.timing(animValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        })
    );

    const animatedStyle = {
        position: 'absolute' as 'absolute',
        top: animValue.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
            outputRange: ['0%', '20%', '70%', '30%', '10%', '0%']
        }),
        left: animValue.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
            outputRange: ['20%', '0%', '30%', '30%', '70%', '20%']
        }),
        width: animValue.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
            outputRange: ['30%', '30%', '30%', '55%', '30%', '30%']
        }),
        aspectRatio: 1,
    };

    useEffect(() => {
        if (playing) {
            loop.start();
            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            loop.stop();
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
            if (duration.current > 0) {
                onFinish(duration.current);
            }
        }

        return () => {
            loop.stop();
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [playing, onFinish, loop]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.animationContainer}>
                <Animated.View style={animatedStyle}>
                    <GlassIcon width="100%" height="100%"/>
                </Animated.View>
            </View>

            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Escolha um objeto comum{'\n'}
                e descubra detalhes que{'\n'}
                nunca notou.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%',
    },
    animationContainer: {
        width: '100%',
        height: 250,
        position: 'relative',
        marginVertical: 30,
    }
});