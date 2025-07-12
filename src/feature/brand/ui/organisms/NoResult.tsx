import React from 'react';

import { View, Text } from 'react-native';

import { Brand } from '../../types/brandType';

import SparkleIcons from '@/shared/icons/SparkleIcons';

interface Props {
  searchedList: Brand[];
}

const NoResult = ({ searchedList }: Props) => {
  return (
    <View className="h-[70%] w-full items-center justify-center">
      <SparkleIcons shape="b-opacity" width={340} height={418} />
      {!searchedList.length && (
        <Text className="absolute mb-20 text-center text-gray-900 headline-04">
          검색결과가 없어요
        </Text>
      )}
    </View>
  );
};

export default NoResult;
