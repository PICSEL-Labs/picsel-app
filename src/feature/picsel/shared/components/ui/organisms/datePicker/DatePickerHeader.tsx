import React from 'react';

import dayjs from 'dayjs';
import { Pressable, Text, View } from 'react-native';

import { PickerMode } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface Props {
  mode: PickerMode;
  current: dayjs.Dayjs;
  onChangeMode: (mode: PickerMode) => void;
  onChangeCurrent: (date: dayjs.Dayjs) => void;
  onConfirm: () => void;
}

const MODE_STEP_MAP: Record<
  PickerMode,
  { unit: dayjs.ManipulateType; amount: number }
> = {
  day: { unit: 'month', amount: 1 },
  month: { unit: 'year', amount: 1 },
  year: { unit: 'year', amount: 12 },
};

const DatePickerHeader = ({
  mode,
  current,
  onChangeMode,
  onChangeCurrent,
}: Props) => {
  const handleChange = (direction: 'prev' | 'next') => {
    const { unit, amount } = MODE_STEP_MAP[mode];
    const diff = direction === 'prev' ? -amount : amount;

    onChangeCurrent(current.add(diff, unit));
  };

  const handlePrev = () => handleChange('prev');
  const handleNext = () => handleChange('next');

  // 연도 범위를 계산
  const startYear = Math.floor(current.year() / 12) * 12;
  const endYear = startYear + 11;

  const isYearMode = (mode as string) === 'year';

  return (
    <View className="pt-1">
      <Text className="text-center text-gray-900 title-01">날짜 선택</Text>

      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={handlePrev} hitSlop={8}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>

        {/* 모드에 따른 중앙 텍스트 변경 */}
        <View className="flex-row items-center">
          {isYearMode ? (
            <Text className="text-gray-900 headline-04">
              {startYear} - {endYear} 년
            </Text>
          ) : (
            <>
              <Pressable
                onPress={() => onChangeMode('year')}
                className="flex-row items-center pr-2">
                <Text className="pr-1 text-gray-900 headline-04">
                  {current.year()}년
                </Text>
                <ToggleIcons
                  shape={isYearMode ? 'up' : 'down'}
                  width={24}
                  height={24}
                  color="#B2B5BD"
                />
              </Pressable>

              <Pressable
                onPress={() => onChangeMode('month')}
                className="flex-row items-center">
                <Text className="pr-1 text-gray-900 headline-04">
                  {current.month() + 1}월
                </Text>
                <ToggleIcons
                  shape={mode === 'month' ? 'up' : 'down'}
                  width={24}
                  height={24}
                  color={mode === 'month' ? '#26272C' : '#B2B5BD'}
                />
              </Pressable>
            </>
          )}
        </View>

        <Pressable onPress={handleNext} hitSlop={8}>
          <ArrowIcons shape="next" width={24} height={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default DatePickerHeader;
