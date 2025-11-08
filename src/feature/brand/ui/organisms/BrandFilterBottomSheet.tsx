import React, { useEffect } from 'react';

import { Pressable, ScrollView, Text, View } from 'react-native';

import { useBrandFilterSheet } from '../../model/hooks/useBrandFilterSheet';
import { useHandleScroll } from '../../model/hooks/useHandleScroll';
import { useGetBrandsList } from '../../queries/useGetBrandList';

import BrandGridList from './BrandGridList';
import SelectButton from './SelectButton';

import ReplayIcons from '@/shared/icons/ReplayIcon';
import { useBrandListStore } from '@/shared/store/brand/brandList';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import BottomSheet from '@/shared/ui/molecules/BottomSheet';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BrandFilterBottomSheet = ({ visible, onClose }: Props) => {
  const { data: brands } = useGetBrandsList();
  const { brandList, setBrandList } = useBrandListStore();
  const { handleScroll, scrollViewRef } = useHandleScroll();
  const { tempFilteredList, filterBrand, resetFilter, applyFilter } =
    useFilteredBrandsStore();
  // const { showToast } = useToastStore();
  const { panGesture, animatedStyle } = useBrandFilterSheet({
    visible,
    onClose,
  });

  useEffect(() => {
    if (brands) {
      setBrandList(brands);
    }
  }, [brands, setBrandList]);

  const handleFilter = (brandId: string, name: string) => {
    const success = filterBrand(brandId, name);

    if (!success) {
      // showToast('브랜드는 최대 5개까지 선택 가능해요', 600); -> 바텀시트 리팩토링이 진행되지 않아 토스트 z-index가 묻혀서 바텀시트 뒤로 렌더링 되는거 같아요
      // 일단 마진값 크게 줘서 토스트 정상 렌더링 확인하였습니다.
      // 리팩토링 진행해주시면 토스트가 시트 위로 올라올 거 같아요.
    }
  };

  const handleApplyFilter = () => {
    applyFilter();
    onClose();
  };

  return (
    <BottomSheet
      title="브랜드 찾기"
      headerRight={
        <Pressable onPress={resetFilter}>
          <View className="flex-row">
            <Text
              className={`mr-1 headline-02 ${
                tempFilteredList.length > 0 ? 'text-pink-500' : 'text-gray-500'
              }`}>
              초기화
            </Text>
            <ReplayIcons
              width={24}
              height={24}
              shape={tempFilteredList.length > 0 ? 'true' : 'false'}
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
          selectedList={tempFilteredList}
          onPress={handleFilter}
          excludeNoneBrand
        />
      </ScrollView>

      <SelectButton
        actualSelectedCount={tempFilteredList.length}
        disabled={!!tempFilteredList.length}
        onPress={handleApplyFilter}
      />
    </BottomSheet>
  );
};

export default BrandFilterBottomSheet;
