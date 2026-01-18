import React, { useRef } from 'react';

import { Animated, Pressable, Text, View } from 'react-native';

import { cn } from '@/shared/lib/cn';
import { defaultButtonShadow, insetShadow } from '@/styles/shadows';

export type DateFilterType = 'year' | 'month' | 'all';

interface Props {
  selected: DateFilterType;
  onSelect: (type: DateFilterType) => void;
}

const FilterTab = ({
  filter,
  isSelected,
  onPress,
  isLast,
}: {
  filter: { type: DateFilterType; label: string };
  isSelected: boolean;
  onPress: () => void;
  isLast: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={isSelected ? defaultButtonShadow : undefined}
        className={cn(
          'flex h-[32px] w-[60px] flex-shrink-0 items-center justify-center px-3 py-1',
          !isLast && 'mr-1',
          isSelected && 'rounded-full bg-white',
        )}>
        <Text
          className={cn(
            isSelected
              ? 'text-primary-pink headline-01'
              : 'text-gray-900 body-rg-02',
          )}>
          {filter.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const DateFilterButton = ({ selected, onSelect }: Props) => {
  const filters: { type: DateFilterType; label: string }[] = [
    { type: 'year', label: '년' },
    { type: 'month', label: '월' },
    { type: 'all', label: '전체' },
  ];

  return (
    <View
      className="flex h-[40px] w-[200px] flex-row items-center justify-between rounded-full bg-[#FFFFFFE5] p-1"
      style={{
        boxShadow: insetShadow.dateFilter,
      }}>
      {filters.map((filter, index) => (
        <FilterTab
          key={filter.type}
          filter={filter}
          isSelected={selected === filter.type}
          onPress={() => {
            if (selected !== filter.type) {
              onSelect(filter.type);
            }
          }}
          isLast={index === filters.length - 1}
        />
      ))}
    </View>
  );
};

export default DateFilterButton;
