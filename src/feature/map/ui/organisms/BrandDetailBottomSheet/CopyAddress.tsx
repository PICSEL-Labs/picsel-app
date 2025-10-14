import React from 'react';

import { View, Text, Pressable } from 'react-native';

import CopyIcons from '@/shared/icons/CopyIcons';
import { defaultButtonShadow } from '@/styles/shadows';

interface Props {
  address: string;
}

const CopyAddress = ({ address }: Props) => {
  return (
    <View
      style={defaultButtonShadow}
      className="absolute bottom-[65px] z-10 h-[44px] w-[345px] flex-row items-center justify-start space-x-1 rounded-xl bg-white">
      <View className="ml-2 rounded-[8px] border border-gray-100 px-1 py-0.5">
        <Text className="text-gray-300 body-rg-01">도로명</Text>
      </View>
      <Text className="text-gray-950 body-rg-02">{address}</Text>
      <Pressable onPress={() => console.log('복사')}>
        <CopyIcons shape="default" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default CopyAddress;
