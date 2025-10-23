import React from 'react';

import { View, Text, Pressable } from 'react-native';

import CopyIcons from '@/shared/icons/CopyIcons';
import { defaultButtonShadow } from '@/styles/shadows';

interface Props {
  detailLocation: string;
}

const CopyAddress = ({ detailLocation }: Props) => {
  return (
    <View
      style={defaultButtonShadow}
      className="absolute bottom-[65px] z-10 h-[44px] w-[345px] flex-row items-center justify-start space-x-1 rounded-xl bg-white px-2">
      <View className="rounded-[8px] border border-gray-100 px-1 py-0.5">
        <Text className="text-gray-300 body-rg-01">도로명</Text>
      </View>
      <Text
        className="text-gray-950 body-rg-02"
        numberOfLines={1}
        ellipsizeMode="tail">
        {detailLocation}
      </Text>
      <Pressable onPress={() => console.log('복사')}>
        <CopyIcons shape="default" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default CopyAddress;
