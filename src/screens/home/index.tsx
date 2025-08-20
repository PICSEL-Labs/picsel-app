import React, { useCallback, useState } from 'react';

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import BrandFilterBottomSheet from '@/feature/brand/ui/organisms/BrandFilterBottomSheet';
import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';

// 초기 카메라 위치 설정
const INITIAL_CAMERA = {
  latitude: 37.5666102, // 서울 중심부 위도
  longitude: 126.9783881, // 서울 중심부 경도
  zoom: 12, // 줌 레벨
};

const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [brandName, setBrandName] = useState('');
  const { openModal, closeModal, isModalOpen } = useModal();

  const handleModal = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isModalOpen, openModal, closeModal]);

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
        onPress={() => navigation.navigate('SearchBrand')}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        container="pb-[8px]"
      />
      <BrandFilterButton
        variant={isModalOpen ? 'active' : 'inactive'}
        onPress={handleModal}
      />
      <BrandFilterBottomSheet visible={isModalOpen} onClose={closeModal} />
    </ScreenLayout>
  );
};

export default HomeScreen;
