import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useAppTheme } from '@/constants/theme';
import HeartIcon from '@/assets/icons/utilities/heart.svg';
import HeartListenIcon from '@/assets/icons/avatars/checkin-escutando-coracao.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function HeartAnimation({ playing, onFinish }: Readonly<Props>) {
    const { colors } = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const scaleValue = useRef(new Animated.Value(0)).current;

    const loop = Animated.loop(
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true
            }),
            Animated.timing(scaleValue, {
                toValue: 0, duration: 1500, easing: Easing.linear, useNativeDriver: true
            })
        ])
    );

    const animatedStyle = {
        transform: [{
            scale: scaleValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.8]
            })
        }]
    };

    useEffect(() => {
        if (playing) {
            loop.start();
            intervalId.current = setInterval(() => { duration.current += 1; }, 1000);
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
                {!playing && <HeartListenIcon width={150} height={150} style={{ margin: 20, marginLeft: 10 }} />}
                {playing && (
                    <Animated.View style={animatedStyle}>
                        <HeartIcon width={150} height={150} />
                    </Animated.View>
                )}
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Coloque a mão no peito,{'\n'}
                respire fundo 5 vezes{'\n'}
                e sinta cada batida.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', width: '100%' },
    imageContainer: { marginVertical: 65, height: 100, justifyContent: 'center' },
    text: { fontWeight: 'bold', textAlign: 'center', fontSize: 18, lineHeight: 22, paddingBottom: 15 }
});