import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import SearchIcons from '@/shared/icons/SearchIcons';

interface Prop {
  text: string;
  back?: boolean;
  search?: boolean;
  onPressIn?: () => void;
}

const SignupHeader = ({ text, back, search, onPressIn }: Prop) => {
  return (
    <View className="mt-2 flex-row items-center justify-center">
      {back && (
        <Pressable onPressIn={onPressIn} className="absolute left-5">
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
      )}
      {search && (
        <Pressable className="absolute right-5" onPressIn={onPressIn}>
          <SearchIcons shape="black" width={24} height={24} />
        </Pressable>
      )}

      <Text className="text-center text-gray-900 title-01">{text}</Text>
    </View>
  );
};

export default SignupHeader;
