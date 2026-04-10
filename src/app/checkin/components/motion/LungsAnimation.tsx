import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import LungsEmpty from '@/assets/icons/avatars/pulmao-vazio.svg';
import LungsFull from '@/assets/icons/avatars/pulmao-cheio.svg';
import ArrowInhale from '@/assets/icons/avatars/seta-inspiracao.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };
type BreathStatus = 0 | 1 | 2; // 0 = idle, 1 = inspire, 2 = exhale

export default function LungsAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const breathTimerId = useRef<NodeJS.Timeout | null>(null);

    const [statusBreath, setStatusBreath] = useState<BreathStatus>(0);
    const [lugEmpty, setLugEmpty] = useState(false);
    const maskAnim = useRef(new Animated.Value(1)).current; // 1 = 100% vazio (height 0%), 0 = 0% vazio (height 100%)

    const startBreath = (status: BreathStatus) => {
        if (breathTimerId.current) clearTimeout(breathTimerId.current);

        if (status === 1) { // Inspirar
            setStatusBreath(1);
            setLugEmpty(false);
            Animated.timing(maskAnim, {
                toValue: 0,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();

            breathTimerId.current = setTimeout(() => {
                startBreath(2); // Inicia a expiração
            }, 5000);
        } else { // Expirar
            setStatusBreath(2);
            Animated.timing(maskAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();

            breathTimerId.current = setTimeout(() => {
                setLugEmpty(true);
                breathTimerId.current = setTimeout(() => {
                    startBreath(1);
                }, 1000);
            }, 500);
        }
    };

    useEffect(() => {
        if (playing) {
            startBreath(1);
            intervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            if (intervalId.current) clearInterval(intervalId.current);
            if (breathTimerId.current) clearTimeout(breathTimerId.current);
            if (duration.current > 0) onFinish(duration.current);
            setStatusBreath(0);
        }
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
            if (breathTimerId.current) clearTimeout(breathTimerId.current);
        };
    }, [playing, onFinish]);

    const animatedMaskStyle = {
        height: maskAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '0%'] // 0 (cheio) = 100% height, 1 (vazio) = 0% height
        })
    };

    const SVG_WIDTH = 100;
    const SVG_HEIGHT = 120;

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {!playing && <LungsEmpty width={SVG_WIDTH} height={SVG_HEIGHT} style={{margin: 20, marginLeft: 10}}/>}

                {playing && (
                    <View style={styles.playingContainer}>
                        <View style={styles.backgroundSvg}>
                            <LungsEmpty width={SVG_WIDTH} height={SVG_HEIGHT}/>
                        </View>

                        <Animated.View style={[styles.maskContainer, animatedMaskStyle]}>
                            <View style={{ width: SVG_WIDTH, height: SVG_HEIGHT, position: 'absolute', bottom: 0 }}>
                                <LungsFull
                                    width={SVG_WIDTH}
                                    height={SVG_HEIGHT}
                                    style={{opacity: lugEmpty ? 0 : 1}}
                                />
                            </View>
                        </Animated.View>

                        {statusBreath === 1 && <ArrowInhale style={styles.arrowInhale}/>}
                    </View>
                )}
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Encha os pulmões de ar{'\n'}
                e solte como um{'\n'}
                suspiro de alívio.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 35, height: 120, justifyContent: 'center'},
    playingContainer: {width: 100, height: 120, position: 'relative', alignItems: 'center'},

    backgroundSvg: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },

    maskContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 2,
        alignItems: 'center'
    },

    arrowInhale: {position: 'absolute', left: '20%', width: '30%', opacity: 1, top: -20, zIndex: 3},
    arrowExhale: {position: 'absolute', right: -20, height: 20, opacity: 1},
    text: {fontWeight: 'bold', textAlign: 'center', fontSize: 18, lineHeight: 22, paddingBottom: 15}
});