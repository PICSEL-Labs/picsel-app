import React from 'react';

import dayjs from 'dayjs';
import { FlatList, Pressable, Text, View } from 'react-native';

import { modalShadow } from '@/shared/styles/shadows';

interface Props {
  current: dayjs.Dayjs;
  onChange: (next: dayjs.Dayjs) => void;
}

const months = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}월`,
  value: i,
}));

const NUM_COLUMNS = 3;

const DatePickerMonthView = ({ current, onChange }: Props) => {
  const selectedMonth = current.month(); // 0~11

  return (
    <FlatList
      data={months}
      keyExtractor={item => item.label}
      numColumns={NUM_COLUMNS}
      scrollEnabled={false}
      columnWrapperStyle={{ justifyContent: 'center' }}
      renderItem={({ item }) => {
        const isSelected = item.value === selectedMonth;

        return (
          <View className="mx-3 my-3 w-20">
            <Pressable onPress={() => onChange(current.month(item.value))}>
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
                  {item.label}
                </Text>
              </View>
            </Pressable>
          </View>
        );
      }}
    />
  );
};

export default DatePickerMonthView;
