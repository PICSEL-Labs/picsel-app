import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import CloseIcons from '@/shared/icons/CloseIcons';

const QrScanHeader = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View className="relative w-full flex-row items-center justify-center">
      <Text className="px-4 py-2 text-white title-01">QR 스캔</Text>
      <Pressable
        className="absolute right-4"
        onPress={() => navigation.popToTop()}>
        <CloseIcons shape="white" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default QrScanHeader;
