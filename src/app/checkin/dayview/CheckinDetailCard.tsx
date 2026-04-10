import CheckIcon from "@/assets/icons/utilities/ico-check-planos.svg";
import {Paragraph} from "@/components/typography/Paragraph";
import React, {useRef} from "react";
import {useAppTheme} from "@/constants/theme";
import {useUserAuthStore} from "@/stores/useUserAuthStore";
import {CheckinOutput} from "@/interfaces/CheckinOutput";
import {CHECKIN_CONTENT_MAP} from "@/app/checkin/data/checkinContent";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {useFontSizes} from "@/hooks/useFontSizeScale";

dayjs.locale('pt-br');
dayjs.extend(utc);


const formatDuration = (totalSeconds: number): string => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export function CheckinDetailCard({checkin}: Readonly<{ checkin: CheckinOutput }>) {
    const {colors} = useAppTheme();
    const userStore = useUserAuthStore.getState();
    const viewShotRef = useRef<ViewShot>(null);
    const {md, sm, xl} = useFontSizes()
    const questionIdParam = Number(checkin.question_id);
    const content = CHECKIN_CONTENT_MAP[questionIdParam];
    const checkinDate = dayjs(checkin.started);
    const headerDate = checkinDate.format('DD [de] MMMM | YYYY');
    const weekDay = checkinDate.format('dddd');
    const timeRegister = checkinDate.format('HH:mm');
    const durationFormatted = formatDuration(checkin.duration);

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>
            <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={true}>
                <View style={styles.header}>
                    <CheckIcon width={36} height={36} style={{marginBottom: 10}} fill={colors.primary}/>
                    <Paragraph color={colors.primary} weight="bold" size={xl}>Meu Treino</Paragraph>
                </View>

                <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.9}}>
                    <View style={[styles.contentSection, {
                        borderTopColor: colors.primary,
                        borderBottomColor: colors.primary,
                        backgroundColor: 'white'
                    }]}>
                        <Paragraph style={styles.greeting} color={'#FFCC29'}
                                   weight="bold">Hooy, {userStore.name}!</Paragraph>

                        <View style={styles.dateContainer}>
                            <View style={styles.dateHeaderRow}>
                                <Paragraph color={colors.primary} size={xl} weight="bold" align="center">
                                    {headerDate}
                                </Paragraph>
                                <Paragraph color={colors.primary} size={sm} style={styles.weekdayText}>
                                    {weekDay}
                                </Paragraph>
                            </View>
                        </View>

                        <View style={styles.detailsContainer}>
                            <View style={styles.detailItem}>
                                <Paragraph align="center" color={colors.secondary} size={md}>
                                    Prática do dia:
                                </Paragraph>
                                <Paragraph align="center" color={colors.primary} size={md}>
                                    {content.summary.practice}
                                </Paragraph>
                            </View>

                            <View style={styles.detailItem}>
                                <Paragraph align="center" color={colors.secondary} size={md}>
                                    Pergunta do dia:
                                </Paragraph>
                                <Paragraph align="center" color={colors.primary} size={md}>
                                    {content.summary.question}
                                </Paragraph>
                            </View>

                            <View style={styles.detailItem}>
                                <Paragraph align="center" color={colors.secondary} size={md}>
                                    Minha resposta:
                                </Paragraph>
                                <Paragraph align="center" color={colors.primary} size={md}>
                                    {checkin.answer || '(Não respondeu)'}
                                </Paragraph>
                            </View>
                        </View>

                        <View style={styles.timeContainer}>
                            <Paragraph align="center" color={colors.primary} size={xl}>
                                Treino feito às <Paragraph color={colors.primary} size={xl}
                                                             weight={"bold"}>{timeRegister}</Paragraph>{'\n'}
                                duração de <Paragraph color={colors.primary} size={xl}
                                                      weight={"bold"}>{durationFormatted}</Paragraph>
                            </Paragraph>
                        </View>
                    </View>
                </ViewShot>

                {/*<View style={styles.buttonContainer}>*/}
                {/*    <PrimaryButton*/}
                {/*        title={"Compartilhar"}*/}
                {/*        onPress={handleShare}*/}
                {/*        disabled={false}*/}
                {/*        background={colors.primary}*/}
                {/*        textColor={colors.onPrimary}*/}
                {/*    />*/}
                {/*</View>*/}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {flex: 1, paddingVertical: 20},
    container: {
        flexGrow: 1,
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    contentSection: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 15,
    },
    greeting: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 30,
        alignSelf: 'flex-start',
    },
    dateContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    dateHeaderRow: {
        alignItems: 'flex-end',
    },
    weekdayText: {
        marginTop: 2,
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 30,
        marginBottom: 30,
    },
    detailItem: {
        width: '100%',
        alignItems: 'center',
    },
    timeContainer: {
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        marginTop: 20,
        gap: 15,
    },
    bottom: {
        left: 0,
        right: 0,
        bottom: 0,
    },
});