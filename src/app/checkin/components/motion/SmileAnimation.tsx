import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useAppTheme } from '@/constants/theme';
import NoSmileIcon from '@/assets/icons/avatars/checkin-without-smile.svg';
import Smile1 from '@/assets/icons/avatars/orange-smile1.svg';
import Smile2 from '@/assets/icons/avatars/orange-smile2.svg';
import Smile3 from '@/assets/icons/avatars/orange-smile3.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function SmileAnimation({ playing, onFinish }: Readonly<Props>) {
    const { colors } = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const countMotion = useRef(0);

    const [smileId, setSmileId] = useState(1);
    const opacity = useRef(new Animated.Value(0)).current;

    const changeSmile = () => {
        setSmileId(s => (s === 3 ? 1 : s + 1));
    };

    const fadeIn = () => {
        opacity.setValue(0);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (playing) {
            fadeIn();
            intervalId.current = setInterval(() => {
                duration.current += 1;
                countMotion.current += 1;

                if (countMotion.current === 3) {
                    countMotion.current = 0;
                    changeSmile();
                    fadeIn();
                }
            }, 1000);
        } else {
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => { if (intervalId.current) clearInterval(intervalId.current); };
    }, [playing, onFinish]);

    const renderSmile = () => (
        <Animated.View style={[styles.smileBase, { opacity }]}>
            {smileId === 1 && <Smile1 width={20} style={styles.smile1} />}
            {smileId === 2 && <Smile2 width={36} style={styles.smile2} />}
            {smileId === 3 && <Smile3 width={36} style={styles.smile3} />}
        </Animated.View>
    );

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <NoSmileIcon width={110} height={110} style={{ margin: 20, marginLeft: 10 }} />
                {playing && renderSmile()}
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Apenas sorria um pouco{'\n'}
                agora… e veja como é estar{'\n'}
                assim, mesmo sem motivo.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', width: '100%' },
    imageContainer: { marginVertical: 20, width: 150, height: 130, position: 'relative', alignItems: 'center' },
    smileBase: { position: 'absolute' },
    smile1: { top: 88, left: 7, marginLeft: -22 },
    smile2: { top: 80, left: 10, marginLeft: -29 },
    smile3: { top: 74, left: 10, marginLeft: -29 },
});