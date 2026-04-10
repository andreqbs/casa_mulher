import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useAppTheme} from '@/constants/theme';
import {useRouter} from 'expo-router';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import CheckIcon from '@/assets/icons/utilities/ico-check-planos.svg';
import {PrimaryButton} from "@/components/buttons/PrimaryButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Paragraph} from "@/components/typography/Paragraph";
import {useCheckinsByUserId} from "@/hooks/useCheckinsByUserId";
import {ExtendedTheme} from "@/interfaces/ExtendedTheme";
import {ROUTES} from "@/constants/Routes";
import {SafeAreaView} from "react-native-safe-area-context";
import NewHeader from "@/components/layout/NewHeader";
import {firstName} from "@/utils/profileUtils";
import {useAuth} from "@/hooks/useAuth";
import {useFontSizes} from "@/hooks/useFontSizeScale";

dayjs.locale('pt-br');
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarCheckinScreen() {
    const {colors} = useAppTheme();
    const router = useRouter();
    const {user} = useAuth()
    const {checkins, isLoadingCheckins} = useCheckinsByUserId(user?.id || "");
    const {xl, md} = useFontSizes()
    const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [checkinCountMonth, setCheckinCountMonth] = useState(0);

    const isLoading = isLoadingCheckins;

    useEffect(() => {
        if (!checkins?.length) return;
        processCalendarData(currentMonth);
    }, [checkins, currentMonth]);

    const processCalendarData = (monthIndex: number) => {
        const marks: { [key: string]: any } = {};
        let totalCheckinsMonth = 0;

        const checkinsByDate: Record<string, number> = {};

        checkins.forEach(checkin => {
            const dateStr = dayjs(checkin.createdAt).format('YYYY-MM-DD');
            const monthOfCheckin = dayjs(checkin.createdAt).month();

            if (monthOfCheckin === monthIndex) {
                totalCheckinsMonth++;
                checkinsByDate[dateStr] = (checkinsByDate[dateStr] || 0) + 1;
            }
        });

        Object.keys(checkinsByDate).forEach(dateStr => {
            marks[dateStr] = {
                customStyles: {
                    container: {
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                    },
                    text: {
                        color: colors.onPrimary,
                        fontWeight: 'bold',
                    },
                },
            };
        });

        // Trata apenas o dia atual
        const todayStr = dayjs().format('YYYY-MM-DD');
        const hasCheckinToday = !!marks[todayStr];

        if (!hasCheckinToday) {
            marks[todayStr] = {
                customStyles: {
                    container: {
                        backgroundColor: '#FFCC2A',
                        borderRadius: 8,
                    },
                    text: {
                        color: colors.secondary,
                        fontWeight: '600',
                    },
                },
            };
        }

        setMarkedDates(marks);
        setCheckinCountMonth(totalCheckinsMonth);
    };


    const handleDayPress = (day: DateData) => {
        const checkinsOfTheDay = checkins.filter(c =>
            dayjs(c.createdAt).format('YYYY-MM-DD') === day.dateString
        );

        if (checkinsOfTheDay.length > 0) {
            router.push({
                pathname: '/(checkin)/dayview/DayViewScreen',
                params: {
                    checkins: JSON.stringify(checkinsOfTheDay),
                    date: day.dateString
                }
            });
        }
    };

    const handleMonthChange = (monthData: any) => {
        const newMonthIndex = dayjs(`${monthData.year}-${monthData.month}-01`).month();
        setCurrentMonth(newMonthIndex);
    };

    const renderCustomArrow = (direction: 'left' | 'right') => (
        <MaterialCommunityIcons
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            size={28}
            color={colors.primary}
        />
    );

    return (
        <SafeAreaView
            style={[styles.safeArea, {backgroundColor: colors.background}]}
            edges={['top', 'left', 'right', 'bottom']}>
            <NewHeader routeBack={ROUTES.HOME}/>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <CheckIcon width={36} height={36} style={{marginBottom: 10}} fill={colors.primary}/>
                    <Paragraph size={xl} color={colors.primary} weight={"bold"}>Meu Treino</Paragraph>
                </View>

                {isLoading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color={colors.primary}/>
                    </View>
                ) : (
                    <View style={[styles.calendarSection, {
                        borderTopColor: colors.primary,
                        borderBottomColor: colors.primary
                    }]}>
                        <Paragraph style={styles.greeting} color={'#FFCC29'} weight="bold">
                            Hooy, {firstName(user?.name || "")}!
                        </Paragraph>

                        <Calendar
                            style={styles.calendar}
                            markedDates={markedDates}
                            onDayPress={handleDayPress}
                            onMonthChange={handleMonthChange}
                            current={dayjs().format('YYYY-MM-DD')}
                            hideExtraDays={true}
                            firstDay={0}
                            renderArrow={renderCustomArrow}
                            markingType={'custom'}
                            theme={{
                                arrowColor: colors.primary,
                                monthTextColor: colors.primary,
                                textMonthFontWeight: 'bold',
                                textMonthFontSize: 18,
                                textSectionTitleColor: colors.primary,
                                todayTextColor: "#FF3434",
                                dayTextColor: colors.secondary,
                                textDisabledColor: colors.outlineVariant,
                                selectedDayBackgroundColor: colors.primary,
                                'stylesheet.calendar.main': {
                                    week: {
                                        marginTop: 0,
                                        marginBottom: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    },
                                    monthView: {marginVertical: 0}
                                }
                            } as ExtendedTheme}
                        />

                        <View style={styles.countContainer}>
                            <Paragraph align={"center"} weight={"bold"} size={xl} color={colors.primary}>
                                {checkinCountMonth} Treino{checkinCountMonth === 1 ? '' : 's'}
                            </Paragraph>
                            <Paragraph align={"center"} size={md} color={colors.primary}>
                                realizado{checkinCountMonth === 1 ? '' : 's'} nesse mês
                            </Paragraph>
                        </View>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title={"INICIAR TREINO"}
                        onPress={() => router.push(ROUTES.CHECKIN)}
                        background={colors.primary}
                        textColor={colors.onPrimary}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {flex: 1},
    container: {justifyContent: 'space-between'},
    centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    header: {alignItems: 'center', marginBottom: 10},
    greeting: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    calendarSection: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginTop: 15,
        paddingTop: 20,
        paddingBottom: 15,
        marginHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    calendar: {width: '100%', marginBottom: 8},
    countContainer: {marginTop: 20, alignItems: 'center'},
    buttonContainer: {paddingHorizontal: 24, marginTop: 20},

});
