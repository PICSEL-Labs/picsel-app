import React, { useCallback, useEffect } from 'react';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import BrandFilterHeader from './BrandFilterHeader';

import { useBrandFilterBottomSheet } from '@/feature/brand/model/hooks/useBrandFilterBottomSheet';
import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import { useGetBrandsList } from '@/feature/brand/queries/useGetBrandList';
import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import { useBrandListStore } from '@/shared/store/brand/brandList';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import { useBrandFilterSheetStore } from '@/shared/store/ui/brandFilterSheet';
import { useToastStore } from '@/shared/store/ui/toast';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/shared/styles/shadows';

const BrandFilterSheet = () => {
  const { visible, source, hideBrandFilterSheet } = useBrandFilterSheetStore();
  const { data: brands } = useGetBrandsList();
  const { brandList, setBrandList } = useBrandListStore();
  const { scrollViewRef, handleScroll } = useHandleScroll();
  const { showToast } = useToastStore();
  const { tempFilteredList, filterBrand, resetTemp, applyFilter } =
    useFilteredBrandsStore();
  const { bottomSheetRef, snapPoints, animationConfigs, handleSheetChange } =
    useBrandFilterBottomSheet({
      visible,
      hideSheet: hideBrandFilterSheet,
    });

  const handleReset = () => {
    if (tempFilteredList.length > 0) {
      resetTemp();
      showToast('선택한 브랜드가 모두 해제됐어요', 50);
    }
  };

  const handleApply = () => {
    applyFilter(source);
    hideBrandFilterSheet();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="none"
        style={[props.style, { backgroundColor: '#11111480' }]}
        opacity={1}
      />
    ),
    [],
  );

  const handlePressBrand = (brandId: string, name: string) => {
    const success = filterBrand(brandId, name);
    if (!success) {
      showToast('브랜드는 최대 5개까지 선택할 수 있어요', 50);
      return;
    }
  };

  useEffect(() => {
    if (brands) {
      setBrandList(brands);
    }
  }, [brands]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      enableDynamicSizing={false}
      enableOverDrag={false}
      style={bottomSheetShadow}
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      animationConfigs={animationConfigs}
      enableContentPanningGesture={false}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      enablePanDownToClose>
      <View className="flex-1">
        <BrandFilterHeader onReset={handleReset} onApply={handleApply} />
        <BottomSheetScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <BrandGridList
            brandList={brandList}
            selectedList={tempFilteredList}
            onPress={handlePressBrand}
            excludeNoneBrand
          />
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
};

export default BrandFilterSheet;
