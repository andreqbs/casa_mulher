import {useLocalSearchParams} from "expo-router";
import {CheckinDetailCard} from "@/app/checkin/dayview/CheckinDetailCard";
import {CheckinsCarousel} from "@/app/checkin/dayview/CheckinsCarousel";
import {Paragraph} from "@/components/typography/Paragraph";

export default function DayViewScreen() {
    const { checkins: checkinsStr } = useLocalSearchParams();
    const checkinsOfTheDay = JSON.parse(checkinsStr ?? '[]');

    const sorted = checkinsOfTheDay.sort(
        (a: { started: string | number | Date; }, b: { started: string | number | Date; }) => new Date(a.started).getTime() - new Date(b.started).getTime()
    );

    if (sorted.length === 0) {
        return <Paragraph>Nenhum treino neste dia.</Paragraph>;
    }

    if (sorted.length === 1) {
        return <CheckinDetailCard checkin={sorted[0]} />;
    }

    return <CheckinsCarousel checkins={sorted} />;
}
