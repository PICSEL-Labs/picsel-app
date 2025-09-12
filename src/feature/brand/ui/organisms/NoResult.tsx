import React from 'react';

import { Text, View } from 'react-native';

import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  visible: boolean;
}

const NoResult = ({ visible }: Props) => {
  return (
    <View className="h-[90%] w-full items-center justify-center">
      <SparkleImages shape="bg-opacity" height={418} width={340} />
      {visible && (
        <Text className="absolute text-center text-gray-900 headline-04">
          검색결과가 없어요
        </Text>
      )}
    </View>
  );
};

export default NoResult;
