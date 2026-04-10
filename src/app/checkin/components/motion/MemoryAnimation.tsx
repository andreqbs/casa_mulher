import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import MemoryIcon from '@/assets/icons/avatars/checkin-memory.svg';
import Smile1 from '@/assets/icons/avatars/orange-smile1.svg';
import Smile2 from '@/assets/icons/avatars/orange-smile2.svg';
import Smile3 from '@/assets/icons/avatars/orange-smile3.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

const circlePositions = [
    {top: 18, left: 73},
    {top: 27, left: 69},
    {top: 34, left: 75},
    {top: 26, left: 77},
    {top: 32, left: 84},
    {top: 44, left: 92},
    {top: 35, left: 92},
    {top: 39, left: 97},
    {top: 35, left: 106},
    {top: 27, left: 107},
    {top: 18, left: 102},
    {top: 24, left: 94},
    {top: 19, left: 86},
    {top: 13, left: 93},
    {top: 13, left: 82},
    {top: 31, left: 100},
];

export default function MemoryAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const countMotion = useRef(0);
    const {xxl} = useFontSizes()
    const [smileId, setSmileId] = useState(1);
    const [idCircle, setIdCircle] = useState(0);

    useEffect(() => {
        if (playing) {
            intervalId.current = setInterval(() => {
                duration.current += 1;
                countMotion.current += 1;

                setIdCircle(Math.floor(Math.random() * 16));

                if (countMotion.current === 5) {
                    countMotion.current = 0;
                    setSmileId(s => (s === 1 ? 2 : s === 2 ? 3 : 2));
                }
            }, 1000);
        } else {
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <MemoryIcon width={130} height={130}/>
                <Smile1 width={20} style={styles.smile1}/>
                {playing && (
                    <>
                        {smileId === 2 && <Smile2 width={36} style={styles.smile2}/>}
                        {smileId === 3 && <Smile3 width={36} style={styles.smile3}/>}

                        <View style={[styles.dot, {backgroundColor: '#FFCC29'}, circlePositions[idCircle]]}/>
                    </>
                )}
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Feche os olhos e traga{'\n'}
                à mente uma lembrança feliz,{'\n'}
                sentindo como se estivesse lá.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 20, width: 120, height: 130, position: 'relative', alignItems: 'center'},
    smile1: {position: 'absolute', top: 90, left: '38%', marginLeft: -10},
    smile2: {position: 'absolute', top: 80, left: '38%', marginLeft: -18},
    smile3: {position: 'absolute', top: 75, left: '38%', marginLeft: -18},
    dot: {width: 5, height: 5, borderRadius: 2.5, position: 'absolute', right: 0, top: 20},
});