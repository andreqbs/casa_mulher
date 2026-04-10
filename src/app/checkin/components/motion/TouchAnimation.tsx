import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import TouchFaceIcon from '@/assets/icons/avatars/checkin-touch-face.svg';
import HeartIcon from '@/assets/icons/utilities/heart.svg';
import ArmsClosed from '@/assets/icons/avatars/touch-arms-closed.svg';
import ArmsOpened from '@/assets/icons/avatars/touch-arms-opened.svg';
import ArmsHalf from '@/assets/icons/avatars/touch-arms-half.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function TouchAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const durationIntervalId = useRef<NodeJS.Timeout | null>(null);
    const armsIntervalId = useRef<NodeJS.Timeout | null>(null);

    const [stepArms, setStepArms] = useState(1);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const heartLoop = Animated.loop(
        Animated.sequence([
            Animated.timing(scaleValue, {toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: true}),
            Animated.timing(scaleValue, {toValue: 0, duration: 1500, easing: Easing.linear, useNativeDriver: true})
        ])
    );

    const heartAnimatedStyle = {
        transform: [{scale: scaleValue.interpolate({inputRange: [0, 1], outputRange: [1, 1.25]})}]
    };

    const fadeArms = () => {
        Animated.sequence([
            Animated.timing(opacity, {toValue: 0, duration: 250, useNativeDriver: true}),
            Animated.timing(opacity, {toValue: 1, duration: 250, useNativeDriver: true})
        ]).start();
    };

    useEffect(() => {
        if (playing) {
            heartLoop.start();

            durationIntervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);

            armsIntervalId.current = setInterval(() => {
                fadeArms();
                setTimeout(() => {
                    setStepArms(s => (s === 1 ? 2 : s === 2 ? 3 : 1));
                }, 250);
            }, 4000);
        } else {
            heartLoop.stop();
            if (durationIntervalId.current) clearInterval(durationIntervalId.current);
            if (armsIntervalId.current) clearInterval(armsIntervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            heartLoop.stop();
            if (durationIntervalId.current) clearInterval(durationIntervalId.current);
            if (armsIntervalId.current) clearInterval(armsIntervalId.current);
        };
    }, [playing, onFinish, heartLoop]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {!playing && (
                    <>
                        <TouchFaceIcon width={120} height={120} style={{margin: 20, marginLeft: 10}}/>
                        <HeartIcon width={50} height={50} style={styles.heartPaused}/>
                        <ArmsClosed style={styles.armsPaused}/>
                    </>)
                }
                {playing && (
                    <View style={styles.playingContainer}>
                        <Animated.View style={[styles.heart, heartAnimatedStyle]}>
                            <HeartIcon width={50} height={50}/>
                        </Animated.View>
                        <TouchFaceIcon width={120} height={120} style={{marginLeft: 10}}/>
                        <Animated.View style={[styles.armsContainer, {opacity}]}>
                            {stepArms === 1 && <ArmsClosed style={styles.arms1}/>}
                            {stepArms === 2 && <ArmsOpened style={styles.arms2}/>}
                            {stepArms === 3 && <ArmsHalf style={styles.arms3}/>}
                        </Animated.View>
                    </View>
                )}
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Toque suas mãos, braços{'\n'}
                e rosto lentamente,{'\n'}
                percebendo a temperatura{'\n'}
                e textura da pele.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 50, paddingBottom: 50, height: 130, justifyContent: 'center'},
    playingContainer: {width: 100, height: 100, position: 'relative', alignItems: 'center', top: 20},
    heart: {width: '25%', height: '25%', position: 'absolute', right: -3, top: -1, zIndex: 1},
    heartPaused: {width: '25%', height: '25%', position: 'absolute', right: -2, top: -1, zIndex: 1},
    armsPaused: {width: '25%', height: '25%', position: 'absolute', right: 30, top: 99, zIndex: 1},
    armsContainer: {position: 'absolute', width: '100%', height: '100%'},
    arms1: {position: 'absolute', width: '60%', left: 5, bottom: -55},
    arms2: {position: 'absolute', width: '100%', left: -25, bottom: -50},
    arms3: {position: 'absolute', width: '100%', left: -32, bottom: -55},
});