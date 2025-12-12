import React, { useEffect } from 'react';

import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import { useBrandFilterBottomSheet } from '../../../../brand/model/hooks/useBrandFilterBottomSheet';
import { useHandleScroll } from '../../../../brand/model/hooks/useHandleScroll';
import { useGetBrandsList } from '../../../../brand/queries/useGetBrandList';
import BrandGridList from '../../../../brand/ui/organisms/BrandGridList';
import BrandFilterHeader from '../../molecules/BrandFilterHeader';

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

  const { tempFilteredList, filterBrand, resetFilter } =
    useFilteredBrandsStore();

  const handleReset = () => {
    if (tempFilteredList.length > 0) {
      resetFilter();
      showToast('선택한 브랜드가 모두 해제됐어요', 50);
    }
  };

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
      enablePanDownToClose>
      <View className="flex-1">
        <BrandFilterHeader onReset={handleReset} />
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

export default BrandFilterBottomSheet;
