import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import ListenIcon from '@/assets/icons/avatars/checkin-parar-escutar.svg';
import Wave1 from '@/assets/icons/utilities/wave-sound-1.svg';
import Wave2 from '@/assets/icons/utilities/wave-sound-2.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function ListenAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl, md} = useFontSizes()
    const TOTAL_TIME = 120;
    const [remaining, setRemaining] = useState(TOTAL_TIME);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    };

    const timerLabel = formatTime(remaining);

    const animValue = useRef(new Animated.Value(0)).current;
    const [currentWave, setCurrentWave] = useState<"wave1" | "wave2">("wave2");

    const animateWave = () => {
        animValue.setValue(0);

        Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            setCurrentWave(prev => (prev === "wave2" ? "wave1" : "wave2"));
            animateWave();
        });
    };

    useEffect(() => {
        if (playing) {
            animateWave();

            intervalId.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId.current!);
                        onFinish(TOTAL_TIME);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } else {
            animValue.stopAnimation();
            if (intervalId.current) clearInterval(intervalId.current);
        }

        return () => {
            animValue.stopAnimation();
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {!playing && (
                    <ListenIcon width={180} style={{marginVertical: 10, marginLeft: 10}} />
                )}

                {playing && (
                    <View style={styles.playingContainer}>

                        {currentWave === "wave2" && (
                            <Animated.View
                                style={{
                                    opacity: animValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })
                                }}
                            >
                                <Wave2 width={250} style={{opacity: 0.99}} />
                            </Animated.View>
                        )}

                        {currentWave === "wave1" && (
                            <Animated.View
                                style={{
                                    opacity: animValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })
                                }}
                            >
                                <Wave1 width={250} />
                            </Animated.View>
                        )}

                    </View>
                )}
            </View>

            <View style={{gap: 15, marginVertical: 15}}>
                <Paragraph color={colors.primary} align={'center'} weight={'bold'} size={md}>
                    {timerLabel}
                </Paragraph>

                <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                    Pare por 2 minutos e{'\n'}
                    apenas escute os sons{'\n'}
                    ao seu redor, um de{'\n'}
                    cada vez.
                </Paragraph>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 80, height: 60, justifyContent: 'center', alignItems: 'center'},
    playingContainer: {
        width: '80%',
        alignItems: 'center',
        height: 80,
        justifyContent: 'center',
        position: 'relative'
    },
});
