import React, {useEffect, useState} from 'react';
import {useAppTheme} from "@/constants/theme";

interface AudioPlayerProps {
    source: string;
    autoPlay?: boolean;
    showPlayControls?: boolean;
    shouldPlay?: boolean
    style?: StyleProp<ViewStyle>;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
                                                            source,
                                                            autoPlay = false,
                                                            showPlayControls = true,
                                                            shouldPlay,
                                                            style
                                                        }) => {
    const {colors} = useAppTheme();

    const player = useAudioPlayer(source, {updateInterval: 250});
    const status = useAudioPlayerStatus(player);

    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState(0);

    useEffect(() => {
        if (autoPlay && player) {
            player.play();
        }
    }, [player, autoPlay]);

    useEffect(() => {
        if (shouldPlay === undefined || !player) return;

        if (shouldPlay) {
            player.play();
        } else {
            player.pause();
        }
    }, [shouldPlay, player]);

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handlePlayPause = () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
            if (status.currentTime >= status.duration) {
                player.seekTo(0);
                player.play();
            }
        }
    };

    const handleMuteToggle = () => {
        player.muted = !player.muted;
    };

    const handleSlidingStart = () => {
        setIsDragging(true);
    };

    const handleSlidingComplete = (value: number) => {
        player.seekTo(value);
        setIsDragging(false);
    };

    const isLoading = status.duration === 0 && !status.playing;

    const currentPosition = isDragging ? dragValue : status.currentTime;

    if (isLoading) {
        return (
            <View style={[styles.container, style, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size="small" color={colors.primary}/>
            </View>
        );
    }

    return (
        <View style={[styles.container, style]}>

            <View style={styles.controlsRow}>

                {showPlayControls && (
                    <TouchableOpacity
                        onPress={handlePlayPause}
                        style={styles.playButton}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    >
                        <Ionicons
                            name={player.playing ? "pause" : "play"}
                            size={24}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                )}

                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={status.duration}
                        value={currentPosition}
                        onSlidingStart={handleSlidingStart}
                        onValueChange={setDragValue}
                        onSlidingComplete={handleSlidingComplete}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor={colors.primary}
                        thumbTintColor={colors.primary}
                    />

                    <View style={styles.timeContainer}>
                        <Text style={[styles.timeText, {color: colors.primary}]}>
                            {formatTime(currentPosition)}
                        </Text>
                        <Text style={[styles.timeText, {color: colors.primary}]}>
                            {formatTime(status.duration)}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleMuteToggle}
                    style={styles.volumeButton}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                >
                    <Ionicons
                        name={player.muted ? "volume-off" : "volume-high"}
                        size={24}
                        color={colors.primary}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
    },
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playButton: {
        padding: 5,
        marginRight: 10,
    },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        marginTop: -8,
    },
    timeText: {
        fontSize: 12,
    },
    volumeButton: {
        padding: 5,
        marginLeft: 10,
    }
});