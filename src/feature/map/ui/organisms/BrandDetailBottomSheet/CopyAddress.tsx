import React from 'react';

import { View, Text, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CopyIcons from '@/shared/icons/CopyIcons';
import Toast from '@/shared/ui/atoms/Toast';
import { defaultButtonShadow } from '@/styles/shadows';

interface Props {
  detailLocation: string;
  copyAddress: string;
  handleCopyAddress: (address: string) => void;
}

const CopyAddress = ({
  detailLocation,
  copyAddress,
  handleCopyAddress,
}: Props) => {
  const bottomAreaHeight = useSharedValue(0);

  return (
    <View
      style={defaultButtonShadow}
      className="absolute bottom-[63px] z-10 h-[44px] w-[345px] flex-row items-center justify-start space-x-1 rounded-xl bg-white px-2">
      <View className="rounded-[8px] border border-gray-100 px-1 py-0.5">
        <Text className="text-gray-300 body-rg-01">도로명</Text>
      </View>
      <Text
        className="text-gray-950 body-rg-02"
        numberOfLines={1}
        ellipsizeMode="tail">
        {detailLocation}
      </Text>
      <Pressable onPress={() => handleCopyAddress(copyAddress)}>
        <CopyIcons shape="default" width={24} height={24} />
      </Pressable>

      <Toast bottomAreaHeight={bottomAreaHeight} />
    </View>
  );
};

export default CopyAddress;
