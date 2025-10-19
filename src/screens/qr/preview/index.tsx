import React from 'react';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';

import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Button from '@/shared/ui/atoms/Button';

type QrPreviewRouteProp = RouteProp<MainNavigationProps, 'QrPreview'>;

interface Props {
  route: QrPreviewRouteProp;
}

const QrPreviewScreen = ({ route }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { url } = route.params || {};

  console.log('QR 스캔으로 인해 추출된 url:', url);

  return (
    <ScreenLayout>
      <View className="relative flex-row items-center justify-center py-3">
        <Pressable
          className="absolute left-4"
          onPress={() => navigation.goBack()}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="text-gray-900 title-01">QR 사진</Text>
      </View>

      <View className="flex-1 items-center justify-center py-10">
        <View className="aspect-[3/4] overflow-hidden bg-gray-200">
          <Image
            source={{ uri: url }}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>
      </View>

      <View className="px-4 py-3">
        <Button
          text="다음"
          color="active"
          textColor="white"
          className="w-full"
        />
      </View>
    </ScreenLayout>
  );
};

export default QrPreviewScreen;
