import React from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 초기 카메라 위치 설정
const INITIAL_CAMERA = {
  latitude: 37.5666102, // 서울 중심부 위도
  longitude: 126.9783881, // 서울 중심부 경도
  zoom: 12, // 줌 레벨
};

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>
      <View className="flex-1">
        <NaverMapView style={{ flex: 1 }} initialCamera={INITIAL_CAMERA} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
