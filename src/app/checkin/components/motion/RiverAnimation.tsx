import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import CheckinRio from '@/assets/icons/avatars/checkin-rio.svg';
import River1 from '@/assets/icons/utilities/river-1.svg';
import River2 from '@/assets/icons/utilities/river-2.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function RiverAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const motionIntervalId = useRef<NodeJS.Timeout | null>(null);
    const durationIntervalId = useRef<NodeJS.Timeout | null>(null);
    const [stepIndex, setStepIndex] = useState(1);

    useEffect(() => {
        if (playing) {
            motionIntervalId.current = setInterval(() => {
                setStepIndex(s => (s === 1 ? 2 : 1));
            }, 400);
            durationIntervalId.current = setInterval(() => {
                duration.current += 1;
            }, 1000);
        } else {
            if (motionIntervalId.current) clearInterval(motionIntervalId.current);
            if (durationIntervalId.current) clearInterval(durationIntervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            if (motionIntervalId.current) clearInterval(motionIntervalId.current);
            if (durationIntervalId.current) clearInterval(durationIntervalId.current);
        };
    }, [playing, onFinish]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                {!playing && <CheckinRio width={140} height={140} style={{marginLeft: 10}}/>}
                {playing && stepIndex === 1 && <River1/>}
                {playing && stepIndex === 2 && <River2/>}
            </View>

            <View style={{gap: 40, marginVertical: 40}}>
            <Paragraph color={colors.primary} align={'center'} weight={'bold'} size={xxl}>
                Imagine um rio fluindo{'\n'}
                dentro de você,{'\n'}
                levando embora o{'\n'}
                excesso e deixando só{'\n'}
                o que importa.
            </Paragraph>

            {/*<Paragraph color={colors.primary} align={'center'} weight={'bold'} size={24}>*/}
            {/*    Apenas respire e observe.*/}
            {/*</Paragraph>*/}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {height: 130, marginVertical: 20, justifyContent: 'center'},
});