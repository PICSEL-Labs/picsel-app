import React, { useRef, useState } from 'react';

import {
  NaverMapView,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { Pressable, StyleSheet, Text } from 'react-native';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import Input from '@/shared/ui/atoms/Input';
import { commonShadow } from '@/styles/shadow';

// 초기 카메라 위치 설정
const INITIAL_CAMERA = {
  latitude: 37.5666102, // 서울 중심부 위도
  longitude: 126.9783881, // 서울 중심부 경도
  zoom: 12, // 줌 레벨
};

const HomeScreen = () => {
  // const TeardropShape = () => (
  //   <Svg width={44} height={52} viewBox="0 0 200 240">
  //     <Defs>
  //       <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //         <Stop offset="100%" stopColor="#FFFFFF" />
  //       </LinearGradient>
  //     </Defs>
  //     <Path
  //       d="M100,20 C145,20 180,55 180,100 C180,145 145,180 100,230 C55,180 20,145 20,100 C20,55 55,20 100,20 Z"
  //       fill="url(#gradient)"
  //     />
  //   </Svg>
  // );

  const mapRef = useRef<NaverMapViewRef>(null);

  const [brandName, setBrandName] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  return (
    <ScreenLayout>
      <NaverMapView
        onCameraChanged={({ latitude, longitude }) => {
          console.log('📡 Center Updated:', latitude, longitude);
        }}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialCamera={INITIAL_CAMERA}
      />

      <Input
        value={brandName}
        onChangeText={brand => setBrandName(brand)}
        handleClear={() => setBrandName('')}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        container="pb-[8px]"
      />
      <BrandFilterButton
        variant={isFilterActive ? 'active' : 'inactive'}
        onPress={() => setIsFilterActive(prev => !prev)}
      />

      <Pressable
        className="h-[40px] w-[149px] flex-shrink-0 flex-row items-center justify-center self-center rounded-[27px] bg-neutral-white"
        style={commonShadow}>
        <ReplayIcons height={24} width={24} shape="default" />
        <Text className="ml-1 text-semantic-info body-rg-02">
          현 지도에서 검색
        </Text>
      </Pressable>

      {/* <TeardropShape /> */}
    </ScreenLayout>
  );
};

export default HomeScreen;
