import React from 'react';

import { View, Text } from 'react-native';

import SemanticIcons from '@/shared/icons/SemanticIcons';

interface Props {
  isAvailable: boolean | null;
  errorMessage: string;
  length: number;
}

const NicknameFeedback = ({ isAvailable, errorMessage, length }: Props) => {
  return (
    <View className="mx-2 mt-2 flex-row justify-between">
      <View className="flex-row items-center">
        {isAvailable === true ? (
          <>
            <SemanticIcons shape="green" width={24} height={24} />
            <Text className="ml-1 text-gray-600 body-rg-02">
              사용할 수 있는 닉네임이에요
            </Text>
          </>
        ) : errorMessage ? (
          <>
            <SemanticIcons shape="pink" width={24} height={24} />
            <Text className="ml-1 text-gray-600 body-rg-02">
              {errorMessage}
            </Text>
          </>
        ) : null}
      </View>

      <Text className="text-gray-600 body-rg-02">({length}/12)</Text>
    </View>
  );
};

export default NicknameFeedback;
