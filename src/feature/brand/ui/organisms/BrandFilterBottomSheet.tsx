import React, { useEffect } from 'react';

import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { useBrandFilterSheet } from '../../model/hooks/useBrandFilterSheet';
import { useHandleScroll } from '../../model/hooks/useHandleScroll';
import { useGetBrandsList } from '../../queries/useGetBrandList';
import BrandFilterToast from '../atoms/BrandFilterToast';

import BrandGridList from './BrandGridList';
import SelectButton from './SelectButton';

import ReplayIcons from '@/shared/icons/ReplayIcon';
import { useBrandListStore } from '@/shared/store/brand/brandList';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import { useToastStore } from '@/shared/store/ui/Toast';
import BottomSheet from '@/shared/ui/molecules/BottomSheet';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BrandFilterBottomSheet = ({ visible, onClose }: Props) => {
  const { data: brands } = useGetBrandsList();
  const { brandList, setBrandList } = useBrandListStore();
  const { handleScroll, scrollViewRef } = useHandleScroll();
  const { filteredList, filterBrand, resetFilter } = useFilteredBrandsStore();
  const { showToast } = useToastStore();
  const { panGesture, animatedStyle, isDisabled, actualCount } =
    useBrandFilterSheet({ visible, onClose });

  const bottomAreaHeight = useSharedValue(0);

  useEffect(() => {
    if (brands) {
      setBrandList(brands);
    }
  }, [brands]);

  const handleFilter = (brandId: string, name: string) => {
    const success = filterBrand(brandId, name);
    if (!success) {
      showToast('브랜드는 최대 5개까지 선택 가능해요');
    }
  };

  const handleButtonLayout = (event: LayoutChangeEvent) => {
    bottomAreaHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <BottomSheet
      onClose={onClose}
      title="브랜드 찾기"
      headerRight={
        <Pressable onPress={resetFilter}>
          <View className="flex-row">
            <Text
              className={`mr-1 headline-02 ${
                filteredList.length > 0 ? 'text-pink-500' : 'text-gray-500'
              }`}>
              초기화
            </Text>
            <ReplayIcons
              width={24}
              height={24}
              shape={filteredList.length > 0 ? 'true' : 'false'}
            />
          </View>
        </Pressable>
      }
      visible={visible}
      animatedStyle={animatedStyle}
      panGesture={panGesture}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
        indicatorStyle="default">
        <BrandGridList
          brandList={brandList}
          selectedList={filteredList}
          onPress={handleFilter}
          excludeNoneBrand
        />
      </ScrollView>
      <View onLayout={handleButtonLayout} className="relative">
        <BrandFilterToast bottomAreaHeight={bottomAreaHeight} />
        <SelectButton
          actualSelectedCount={actualCount}
          disabled={!isDisabled}
        />
      </View>
    </BottomSheet>
  );
};

export default BrandFilterBottomSheet;
