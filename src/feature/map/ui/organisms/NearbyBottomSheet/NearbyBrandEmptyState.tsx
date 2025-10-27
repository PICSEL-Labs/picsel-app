import React from 'react';

import { Text, View } from 'react-native';

import SparkleImages from '@/shared/images/Sparkle';

const NearbyBrandEmptyState = () => {
  return (
    <View className="h-[120px] items-center space-y-2">
      <Text className="mt-5 text-gray-900 headline-03">
        2km 이내엔 포토부스가 없어요😢
      </Text>
      <View className="absolute -top-5">
        <SparkleImages shape="bg-opacity" width={105} height={130} />
      </View>
      <Text className="text-gray-900 body-rg-03">지도를 옮겨볼까요?</Text>
    </View>
  );
};

export default NearbyBrandEmptyState;
