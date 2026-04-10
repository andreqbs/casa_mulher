import {Pressable, StyleSheet, View} from "react-native";
import React, {useMemo} from "react";
import {useAppTheme} from "@/constants/theme";
import {Paragraph} from "@/components/typography/Paragraph";
import {CheckinOutput} from "@/interfaces/CheckinOutput";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import dayjs from "dayjs";
import {router} from "expo-router";

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface calendarProps {
    checkins: CheckinOutput[];
    bgCheckinColor?: string;
    bgCurrentDayColor?: string
    bgOtherDays?: string
    textColor?: string
    textColor2?: string
}

export function Calendar({
                             checkins,
                             bgCheckinColor,
                             bgCurrentDayColor,
                             bgOtherDays,
                             textColor,
                             textColor2
                         }: Readonly<calendarProps>) {

    const {colors} = useAppTheme();
    const today = new Date().getDay();

    const safeCheckins = Array.isArray(checkins) ? checkins : [];

    const checkinDays = useMemo(() => {
        const set = new Set<number>();
        for (const c of safeCheckins) {
            const date = new Date(c.createdAt);
            if (!isNaN(date.getTime())) {
                set.add(date.getDay());
            }
        }
        return set;
    }, [safeCheckins]);

    const handleWeekdayPress = (weekday: number) => {
        const checkinsOfTheDay = safeCheckins.filter(c => {
            const date = new Date(c.createdAt);
            return !isNaN(date.getTime()) && date.getDay() === weekday;
        });

        if (checkinsOfTheDay.length === 0) return;

        const selectedDate = dayjs(checkinsOfTheDay[0].createdAt).format('YYYY-MM-DD');

        router.push({
            pathname: '/(checkin)/dayview/DayViewScreen',
            params: {
                checkins: JSON.stringify(checkinsOfTheDay),
                date: selectedDate,
            },
        });
    };


    return (
        <View style={styles.weekContainer}>
            {WEEKDAYS.map((day, i) => {
                const isToday = i === today;
                const hasCheckin = checkinDays.has(i);

                const circleStyle = [
                    styles.dayCircle,
                    hasCheckin
                        ? {
                            backgroundColor: bgCheckinColor,
                            borderColor: colors.onPrimary,
                            borderWidth: 1,
                        }
                        : isToday
                            ? {
                                backgroundColor: bgCurrentDayColor,
                                borderColor: colors.onPrimary,
                                borderWidth: 1,
                            }
                            : {
                                backgroundColor: bgOtherDays,
                                borderColor: colors.onPrimary,
                                borderWidth: 1,
                            },
                ];

                const textColor3 = hasCheckin || isToday ? textColor : textColor2;

                return (
                    <Pressable
                        key={i}
                        onPress={() => handleWeekdayPress(i)}
                        disabled={!hasCheckin}
                    >
                        <View style={circleStyle}>
                            <Paragraph color={textColor3} weight="bold" size={20}>
                                {day}
                            </Paragraph>

                            {hasCheckin && (
                                <View
                                    style={[
                                        styles.checkBadge,
                                        {
                                            borderColor: colors.background,
                                            backgroundColor: bgCheckinColor,
                                        },
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name="check-bold"
                                        size={11}
                                        color="#FFF"
                                    />
                                </View>
                            )}
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    weekContainer: {flexDirection: 'row', justifyContent: 'space-around', width: '100%'},
    dayCircle: {width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'},
    checkBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }
});

