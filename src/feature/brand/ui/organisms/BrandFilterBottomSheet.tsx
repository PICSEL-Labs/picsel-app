import React, { useEffect } from 'react';

import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import { useBrandFilterBottomSheet } from '../../model/hooks/useBrandFilterBottomSheet';
import { useHandleScroll } from '../../model/hooks/useHandleScroll';
import { useGetBrandsList } from '../../queries/useGetBrandList';
import BrandFilterHeader from '../molecules/BrandFilterHeader';

import BrandGridList from './BrandGridList';
import SelectButton from './SelectButton';

import { useBrandListStore } from '@/shared/store/brand/brandList';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import { useToastStore } from '@/shared/store/ui/toast';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Props {
  visible: boolean;
  showSheet: () => void;
  hideSheet: () => void;
}

const BrandFilterBottomSheet = ({ visible, showSheet, hideSheet }: Props) => {
  const { data: brands } = useGetBrandsList();
  const { brandList, setBrandList } = useBrandListStore();
  const { scrollViewRef, handleScroll } = useHandleScroll();

  const { showToast } = useToastStore();

  const { tempFilteredList, filterBrand, resetFilter, applyFilter } =
    useFilteredBrandsStore();

  const { bottomSheetRef, snapPoints, animationConfigs, handleSheetChange } =
    useBrandFilterBottomSheet({ visible, showSheet, hideSheet });

  useEffect(() => {
    if (brands) {
      setBrandList(brands);
    }
  }, [brands]);

  const handlePressBrand = (brandId: string, name: string) => {
    const success = filterBrand(brandId, name);
    if (!success) {
      showToast('브랜드는 최대 5개까지 선택할 수 있어요', 50);
      return;
    }
  };

  const handleApply = () => {
    applyFilter();
    hideSheet();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      enableDynamicSizing={false} // 동적 높이 조절 기능 Off -> 최대 높이 snapPoints의 index={1}
      enableOverDrag={false}
      style={bottomSheetShadow}
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      animationConfigs={animationConfigs}
      enableContentPanningGesture={false} // 드래그로 시트 움직임 (기본 동작) 차단
      onChange={handleSheetChange}
      enablePanDownToClose>
      <View className="flex-1">
        <BrandFilterHeader
          selectedCount={tempFilteredList.length}
          onReset={resetFilter}
        />

        <BottomSheetScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <View className="px-4 pt-2">
            <BrandGridList
              brandList={brandList}
              selectedList={tempFilteredList}
              onPress={handlePressBrand}
              excludeNoneBrand
            />
          </View>
        </BottomSheetScrollView>

        <View className="p-5">
          <SelectButton
            actualSelectedCount={tempFilteredList.length}
            disabled={tempFilteredList.length === 0}
            onPress={handleApply}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default BrandFilterBottomSheet;
