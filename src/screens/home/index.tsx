import React, { useState } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import Input from '@/shared/ui/atoms/Input';

// 초기 카메라 위치 설정
const INITIAL_CAMERA = {
  latitude: 37.5666102, // 서울 중심부 위도
  longitude: 126.9783881, // 서울 중심부 경도
  zoom: 12, // 줌 레벨
};

const HomeScreen = () => {
  const [brandName, setBrandName] = useState('');
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <ScreenLayout>
      <NaverMapView
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
        variant={isModalOpen ? 'active' : 'inactive'}
        onPress={() => {
          if (isModalOpen) {
            closeModal();
          } else {
            openModal();
          }
        }}
      />
      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />
    </ScreenLayout>
  );
};

export default HomeScreen;
