import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import { FlatList, Pressable, Text, View } from 'react-native';

import { modalShadow } from '@/shared/styles/shadows';

interface Props {
  current: dayjs.Dayjs;
  onChange: (next: dayjs.Dayjs) => void;
}

const YEARS_PER_PAGE = 12;
const NUM_COLUMNS = 3;

const DatePickerYearView = ({ current, onChange }: Props) => {
  const currentYear = current.year();

  const startYear = Math.floor(currentYear / YEARS_PER_PAGE) * YEARS_PER_PAGE;

  const years = useMemo(
    () => Array.from({ length: YEARS_PER_PAGE }, (_, i) => startYear + i),
    [startYear],
  );

  return (
    <FlatList
      data={years}
      keyExtractor={item => item.toString()}
      numColumns={NUM_COLUMNS}
      scrollEnabled={false}
      columnWrapperStyle={{ justifyContent: 'center' }}
      renderItem={({ item: year }) => {
        const isSelected = year === currentYear;

        return (
          <View className="mx-3 my-3">
            <Pressable onPress={() => onChange(current.year(year))}>
              <View
                style={isSelected && modalShadow}
                className={`items-center rounded-xl px-3 py-2 ${
                  isSelected && 'bg-pink-500'
                }`}>
                <Text
                  className={
                    isSelected
                      ? 'text-white headline-02'
                      : 'text-gray-900 body-rg-03'
                  }>
                  {year}년
                </Text>
              </View>
            </Pressable>
          </View>
        );
      }}
    />
  );
};

export default DatePickerYearView;
