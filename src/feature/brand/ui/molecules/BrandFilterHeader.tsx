import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ReplayIcons from '@/shared/icons/ReplayIcon';

interface Props {
  selectedCount: number;
  onReset: () => void;
}

const BrandFilterHeader = ({ selectedCount, onReset }: Props) => {
  return (
    <View className="relative my-1 w-full items-center justify-center px-4">
      <Text className="text-center text-gray-900 title-01">브랜드 찾기</Text>

      <Pressable onPress={onReset} className="absolute right-5">
        <View className="flex-row items-center">
          <Text
            className={`mr-1 headline-02 ${
              selectedCount > 0 ? 'text-pink-500' : 'text-gray-500'
            }`}>
            초기화
          </Text>
          <ReplayIcons
            width={24}
            height={24}
            shape={selectedCount > 0 ? 'true' : 'false'}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default BrandFilterHeader;
