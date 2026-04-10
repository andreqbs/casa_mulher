import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {CheckinDetailCard} from './CheckinDetailCard';
import {CheckinOutput} from "@/interfaces/CheckinOutput";
import {logError} from "@/services/log/LogService";

export function CheckinsCarousel({checkins}: Readonly<{ checkins: CheckinOutput[] }>) {
    const carouselRef = useRef<ICarouselInstance>(null);
    const {width, height} = Dimensions.get("window");

    return (
        <Carousel
            ref={carouselRef}
            data={checkins}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height}
            scrollAnimationDuration={300}
            loop={false}
            autoPlay={false}
            onConfigurePanGesture={(gesture) => {
                try {
                    gesture.activeOffsetX([-12, 12]);
                } catch (e) {
                    logError("Error configuring gesture: " + (e as Error).message).then(
                        () => {
                            console.warn("Error getting gesture");
                        }
                    );

                }
                return gesture;
            }}
            renderItem={({item}: { item: CheckinOutput }) => (
                <View style={{width, height}}>
                    <CheckinDetailCard checkin={item}/>
                </View>
            )}
        />
    );
}
