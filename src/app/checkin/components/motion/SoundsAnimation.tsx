import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/constants/theme';
import ScanIcon from '@/assets/icons/avatars/checkin-scan-olhos-fechados.svg';
import SoundBox from '@/assets/icons/utilities/sound-box.svg';
import SoundLevel1 from '@/assets/icons/utilities/sound-level-1.svg';
import SoundLevel2 from '@/assets/icons/utilities/sound-level-2.svg';
import SoundLevel3 from '@/assets/icons/utilities/sound-level-3.svg';
import SoundLevel4 from '@/assets/icons/utilities/sound-level-4.svg';
import SoundLevel5 from '@/assets/icons/utilities/sound-level-5.svg';
import SoundLevel6 from '@/assets/icons/utilities/sound-level-6.svg';
import SoundLevel7 from '@/assets/icons/utilities/sound-level-7.svg';
import SoundLevel8 from '@/assets/icons/utilities/sound-level-8.svg';
import SoundLevel9 from '@/assets/icons/utilities/sound-level-9.svg';
import {Paragraph} from "@/components/typography/Paragraph";
import {useFontSizes} from "@/hooks/useFontSizeScale";

type Props = { playing: boolean; onFinish: (duration: number) => void; };

export default function SoundsAnimation({playing, onFinish}: Readonly<Props>) {
    const {colors} = useAppTheme();
    const {xxl} = useFontSizes()
    const duration = useRef(0);
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const [idWave, setIdWave] = useState(1);
    const [direction, setDirection] = useState<'up' | 'down'>('up');

    const updateWave = () => {
        setDirection(dir => {
            if (dir === 'up') {
                if (idWave === 9) {
                    setIdWave(8);
                    return 'down';
                }
                setIdWave(w => w + 1);
                return 'up';
            } else {
                if (idWave === 1) {
                    setIdWave(2);
                    return 'up';
                }
                setIdWave(w => w - 1);
                return 'down';
            }
        });
    };

    useEffect(() => {
        if (playing) {
            intervalId.current = setInterval(() => {
                duration.current += 1;
                updateWave();
            }, 1000);
        } else {
            if (intervalId.current) clearInterval(intervalId.current);
            if (duration.current > 0) onFinish(duration.current);
        }
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [playing, onFinish, idWave]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <ScanIcon width={160} height={160}/>
                <View style={styles.soundContainer}>
                    <SoundBox style={styles.soundBox}/>
                    {idWave >= 1 && <SoundLevel1 style={styles.wave1}/>}
                    {idWave >= 2 && <SoundLevel2 style={styles.wave2}/>}
                    {idWave >= 3 && <SoundLevel3 style={styles.wave3}/>}
                    {idWave >= 4 && <SoundLevel4 style={styles.wave4}/>}
                    {idWave >= 5 && <SoundLevel5 style={styles.wave5}/>}
                    {idWave >= 6 && <SoundLevel6 style={styles.wave6}/>}
                    {idWave >= 7 && <SoundLevel7 style={styles.wave7}/>}
                    {idWave >= 8 && <SoundLevel8 style={styles.wave8}/>}
                    {idWave >= 9 && <SoundLevel9 style={styles.wave9}/>}
                </View>
            </View>
            <Paragraph align={"center"} weight={"bold"} size={xxl} color={colors.primary}>
                Sente-se em silêncio{'\n'}
                e perceba sua respiração,{'\n'}
                batimentos ou{'\n'}
                movimentos internos.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center', width: '100%'},
    imageContainer: {marginVertical: 60, height: 120, position: 'relative', alignItems: 'center'},
    soundContainer: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{scale: 0.6}]},
    soundBox: {position: 'absolute', top: 55, left: 40},
    wave1: {position: 'absolute', top: 68, left: 94},
    wave2: {position: 'absolute', top: 61, left: 98},
    wave3: {position: 'absolute', top: 54, left: 102},
    wave4: {position: 'absolute', top: 47, left: 106},
    wave5: {position: 'absolute', top: 39, left: 110},
    wave6: {position: 'absolute', top: 31, left: 114},
    wave7: {position: 'absolute', top: 23, left: 118},
    wave8: {position: 'absolute', top: 15, left: 122},
    wave9: {position: 'absolute', top: 7, left: 126},
    text: {fontWeight: 'bold', textAlign: 'center', fontSize: 18, lineHeight: 22, paddingBottom: 15}
});