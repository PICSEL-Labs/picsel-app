import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import AlbumIcons from '@/shared/icons/AlbumIcons';

const QrScanFooter = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View className="w-full items-center gap-4 pb-28">
      <Text className="text-center text-white body-rg-01">
        QR 스캔을 지원하지 않는 브랜드일 땐,{'\n'} 사진이 담긴 링크를
        열어드릴게요
      </Text>
      <Pressable
        className="flex-row items-center justify-center gap-1 rounded-xl border border-pink-500 p-3"
        onPress={() =>
          navigation.navigate('SelectPhoto', {
            variant: 'main',
          })
        }>
        <AlbumIcons shape="pink" width={24} height={24} />
        <Text
          className="leading-4 text-pink-500 headline-02"
          style={{ lineHeight: 16 }}>
          앨범에서 업로드
        </Text>
      </Pressable>
    </View>
  );
};

export default QrScanFooter;
