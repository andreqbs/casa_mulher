import React, {useEffect, useRef, useState} from 'react';
import {useAppTheme} from '@/constants/theme';
import Cloud1 from '@/assets/icons/utilities/cloud-1.svg';
import Cloud2 from '@/assets/icons/utilities/cloud-2.svg';
import Cloud3 from '@/assets/icons/utilities/cloud-3.svg';
import Cloud4 from '@/assets/icons/utilities/cloud-4.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void };

const timerString = (minutes: number, seconds: number) =>
    `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

export default function CloudsAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {width: SCREEN_WIDTH} = Dimensions.get("window");
    const {xxl} = useFontSizes()

    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const [timerLabel, setTimerLabel] = useState("00:00");

    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;
    const anim3 = useRef(new Animated.Value(0)).current;
    const anim4 = useRef(new Animated.Value(0)).current;

    const makeLoop = (anim: Animated.Value, duration: number, delay?: number) =>
        Animated.loop(
            Animated.timing(anim, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.linear,
                useNativeDriver: true
            })
        );

    const loop1 = makeLoop(anim1, 12000);
    const loop2 = makeLoop(anim2, 10000, 2000);
    const loop3 = makeLoop(anim3, 14000, 5000);
    const loop4 = makeLoop(anim4, 10000, 6000);

    useEffect(() => {
        if (playing) {
            anim1.setValue(0);
            anim2.setValue(0);
            anim3.setValue(0);
            anim4.setValue(0);

            loop1.start();
            loop2.start();
            loop3.start();
            loop4.start();

            intervalId.current = setInterval(() => {
                duration.current += 1;
                const m = Math.floor(duration.current / 60);
                const s = duration.current % 60;
                setTimerLabel(timerString(m, s));
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

    }, [playing]);

    const makeCloudAnim = (anim: Animated.Value, cloudWidth: number) => ({
        transform: [
            {
                translateX: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                        -SCREEN_WIDTH - cloudWidth,
                        SCREEN_WIDTH + cloudWidth
                    ]
                })
            }
        ]
    });

    return (
        <View style={styles.wrapper}>
            <View style={styles.animationContainer}>

                {!playing && (
                    <View style={styles.cloudsStatic}>
                        <Cloud4 width={140}/>
                        <Cloud3 width={200}/>
                        <Cloud2 width={140}/>
                    </View>
                )}

                {playing && (
                    <>
                        <Animated.View
                            style={[
                                styles.cloud,
                                {top: 20, marginLeft: -50},
                                makeCloudAnim(anim4, 100)
                            ]}
                        >
                            <Cloud4 width={100}/>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.cloud,
                                {top: 70, marginLeft: -50},
                                makeCloudAnim(anim2, 100)
                            ]}
                        >
                            <Cloud2 width={100}/>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.cloud,
                                {top: 130, marginLeft: -70},
                                makeCloudAnim(anim3, 140)
                            ]}
                        >
                            <Cloud3 width={140}/>
                        </Animated.View>

                        <Animated.View
                            style={[
                                styles.cloud,
                                {top: 180, marginLeft: -50},
                                makeCloudAnim(anim1, 100)
                            ]}
                        >
                            <Cloud1 width={100}/>
                        </Animated.View>
                    </>
                )}
            </View>

            {playing && (
                <Text style={[styles.timer, {color: colors.primary}]}>
                    {timerLabel}
                </Text>
            )}

            <Paragraph align="center" weight="bold" size={xxl} color={colors.primary}>
                Veja cores, formas{'\n'}
                das nuvens, movimentos{'\n'}
                sutis.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        width: "100%"
    },
    animationContainer: {
        width: "100%",
        height: 280,
        position: "relative",
        overflow: "hidden",
        marginBottom: 20
    },
    cloudsStatic: {
        width: "100%",
        height: 220,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    },
    cloud: {
        position: "absolute",
        left: "50%"
    },
    timer: {
        fontSize: 14,
        padding: 5
    }
});
