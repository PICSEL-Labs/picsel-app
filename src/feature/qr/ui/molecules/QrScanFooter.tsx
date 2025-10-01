import React from 'react';

import { Pressable, Text, View } from 'react-native';

import AlbumIcons from '@/shared/icons/AlbumIcons';

const QrScanFooter = () => (
  <View className="w-full items-center gap-4 pb-11">
    <Text className="text-center text-white body-rg-01">
      QR 스캔을 지원하지 않는 브랜드일 땐,{'\n'} 사진이 담긴 링크를 열어드릴게요
    </Text>
    <Pressable className="flex-row items-center justify-center gap-1 rounded-xl border border-pink-500 p-3">
      <AlbumIcons shape="pink" width={24} height={24} />
      <Text
        className="leading-4 text-pink-500 headline-02"
        style={{ lineHeight: 16 }}>
        앨범에서 업로드
      </Text>
    </Pressable>
  </View>
);

export default QrScanFooter;
