import React from 'react';

import { View, Text } from 'react-native';

import SparkleImages from '@/shared/images/Sparkle';

const EmptyNotification = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <SparkleImages shape="bg-opacity" width={375} height={736} />
      <Text className="absolute text-gray-900 headline-04">
        아직 받은 알림이 없어요
      </Text>
    </View>
  );
};

export default EmptyNotification;
