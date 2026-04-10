import React, { useEffect, useRef } from 'react';
import { useAppTheme } from '@/constants/theme';
import FrascoIcon from '@/assets/icons/utilities/frasco-aroma.svg';
import AromaIcon from '@/assets/icons/utilities/aroma.svg';
import AromaLinha1 from '@/assets/icons/utilities/aroma-linha1.svg';
import AromaLinha3 from '@/assets/icons/utilities/aroma-linha3.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function FragranceAnimation({ playing, onFinish }: Readonly<Props>) {
    const { colors } = useAppTheme();
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const {xxl} = useFontSizes()

    const animValue1 = useRef(new Animated.Value(0)).current;
    const animValue2 = useRef(new Animated.Value(0)).current;
    const animValue3 = useRef(new Animated.Value(0)).current;

    const loop1 = Animated.loop(Animated.sequence([
        Animated.timing(animValue1, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(animValue1, { toValue: 0, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    ]));
    const loop2 = Animated.loop(Animated.sequence([
        Animated.timing(animValue2, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(animValue2, { toValue: 0, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    ]));
    const loop3 = Animated.loop(Animated.sequence([
        Animated.timing(animValue3, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(animValue3, { toValue: 0, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    ]));

    useEffect(() => {
        if (playing) {
            loop1.start();
            loop2.start();
            loop3.start();
            intervalId.current = setInterval(() => { duration.current += 1; }, 1000);
        } else {
            loop1.stop();
            loop2.stop();
            loop3.stop();
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            loop1.stop();
            loop2.stop();
            loop3.stop();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, loop1, loop2, loop3]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {!playing && <FrascoIcon width={85} height={100} style={{ marginVertical: 20 }} />}
                {playing && (
                    <View style={styles.playingContainer}>
                        <Animated.View style={{ transform: [{ translateY: animValue1.interpolate({ inputRange: [0, 1], outputRange: [5, -15] }) }] }}>
                            <AromaLinha1 width={80} height={80} style={{ position: 'absolute', left: 5, top: 5 }} />
                        </Animated.View>
                        <Animated.View style={{ transform: [{ translateY: animValue2.interpolate({ inputRange: [0, 1], outputRange: [-5, 15] }) }] }}>
                            <AromaLinha3 width={80} height={80} style={{ position: 'absolute', left: 50, top: 25 }} />
                        </Animated.View>
                        <Animated.View style={{ transform: [{ scale: animValue3.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }] }}>
                            <AromaIcon width={125} height={125} />
                        </Animated.View>
                    </View>
                )}
            </View>

            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Aproxime algo do nariz{'\n'}
                e inspire devagar,{'\n'}
                sentindo cada detalhe{'\n'}
                do aroma.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', width: '100%' },
    imageContainer: { marginVertical: 30, height: 130, justifyContent: 'center' },
    playingContainer: { width: 125, height: 125, position: 'relative' },
    text: { fontWeight: 'bold', textAlign: 'center', fontSize: 18, lineHeight: 22, paddingBottom: 15 }
});