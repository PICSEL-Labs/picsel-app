import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';

import {
  CELL_WIDTH,
  DATE_STYLES,
  TOTAL_CALENDAR_CELLS,
  WEEK_DAYS,
} from '@/feature/picsel/shared/constants/datePicker';

interface Props {
  current: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs;
  onSelect: (next: dayjs.Dayjs) => void;
}

const DatePickerDayView = ({ current, selectedDate, onSelect }: Props) => {
  const cells = useMemo(() => {
    const daysInMonth = current.daysInMonth();

    const startDay = current.startOf('month').day();

    return Array.from({ length: TOTAL_CALENDAR_CELLS }, (_, i) => {
      const dayOffset = i - startDay + 1;
      const date = current.startOf('month').add(dayOffset - 1, 'day');

      return {
        day: date.date(),
        isCurrentMonth: dayOffset > 0 && dayOffset <= daysInMonth,
        date,
      };
    });
  }, [current]);

  const getDateStyles = (item: (typeof cells)[0]) => {
    const isSelected = selectedDate?.isSame(item.date, 'day');
    const isToday = dayjs().isSame(item.date, 'day');

    const containerStyle = [
      'h-10 w-10 items-center justify-center rounded-full',
      isSelected ? DATE_STYLES.SELECTED_BG : '',
      !isSelected && isToday ? DATE_STYLES.TODAY_BORDER : '',
    ].join(' ');

    const textStyle = !item.isCurrentMonth
      ? DATE_STYLES.TEXT.NOT_CURRENT_MONTH
      : isSelected
        ? DATE_STYLES.TEXT.SELECTED
        : isToday
          ? DATE_STYLES.TEXT.TODAY
          : DATE_STYLES.TEXT.DEFAULT;

    return { containerStyle, textStyle };
  };

  return (
    <View className="pt-2">
      <View className="mb-3 flex-row">
        {WEEK_DAYS.map(day => (
          <View
            key={day.key}
            style={{ flexBasis: CELL_WIDTH }}
            className="items-center">
            <Text className="text-gray-300 body-rg-01">{day.label}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {cells.map((item, idx) => {
          const { containerStyle, textStyle } = getDateStyles(item);

          return (
            <Pressable
              key={`${item.date.toString()}-${idx}`}
              onPress={() => item.isCurrentMonth && onSelect(item.date)}
              style={{ flexBasis: CELL_WIDTH }}
              className="mb-3 items-center">
              <View className={containerStyle}>
                <Text className={`body-rg-03 ${textStyle}`}>{item.day}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default DatePickerDayView;
