import {Calendar, CalendarProps} from 'react-native-calendars';

type ThemeType = NonNullable<CalendarProps['theme']>;

export interface ExtendedTheme extends ThemeType {
    ['stylesheet.calendar.main']?: {
        week?: object;
        monthView?: object;
    };
}
