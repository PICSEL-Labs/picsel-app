import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';

import {
  DATE_STYLES,
  DAYS_PER_WEEK,
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
    const weeksNeeded = Math.ceil((startDay + daysInMonth) / DAYS_PER_WEEK);
    const totalCells = weeksNeeded * DAYS_PER_WEEK;

    return Array.from({ length: totalCells }, (_, i) => {
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

  const weeksNeeded = cells.length / DAYS_PER_WEEK;

  return (
    <View className="pt-2">
      <View className="mb-3 flex-row">
        {WEEK_DAYS.map(day => (
          <View key={day.key} style={{ flex: 1 }} className="items-center">
            <Text className="text-gray-300 body-rg-01">{day.label}</Text>
          </View>
        ))}
      </View>

      <View>
        {Array.from({ length: weeksNeeded }, (_, weekIdx) => (
          <View key={weekIdx} className="flex-row">
            {cells
              .slice(weekIdx * DAYS_PER_WEEK, (weekIdx + 1) * DAYS_PER_WEEK)
              .map((item, idx) => {
                const { containerStyle, textStyle } = getDateStyles(item);

                return (
                  <Pressable
                    key={`${item.date.toString()}-${idx}`}
                    onPress={() => item.isCurrentMonth && onSelect(item.date)}
                    style={{ flex: 1 }}
                    className="mb-3 items-center">
                    <View className={containerStyle}>
                      <Text className={`body-rg-03 ${textStyle}`}>
                        {item.day}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default DatePickerDayView;
