import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { useFilteredBrandsStore } from '@/shared/store';

interface Props {
  onReset: () => void;
}

const BrandFilterHeader = ({ onReset }: Props) => {
  const { applyFilter } = useFilteredBrandsStore();

  return (
    <View className="w-full flex-row items-center px-4 pb-2">
      <View className="flex-1">
        <Pressable onPress={onReset}>
          <Text className="p-2 text-gray-600 headline-02">전체해제</Text>
        </Pressable>
      </View>

      <Text className="text-center text-gray-900 title-01">브랜드 찾기</Text>

      <View className="flex-1 items-end">
        <Pressable
          onPress={applyFilter}
          style={({ pressed }) => [
            {
              padding: 8,
              borderRadius: 12,
              backgroundColor: pressed ? '#FECDDD' : 'transparent',
            },
          ]}>
          {({ pressed }) => (
            <Text
              className={`headline-02 ${
                pressed ? 'text-white' : 'text-pink-500'
              }`}>
              적용하기
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default BrandFilterHeader;
