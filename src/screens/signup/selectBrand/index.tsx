import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import SignupHeader from '@/feature/auth/signup/ui/organisms/SignupHeader';
import SignupIntro from '@/feature/auth/signup/ui/organisms/SignupIntro';
import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import { useSelectedBrands } from '@/feature/brand/model/hooks/useSelectedBrands';
import { useGetBrandsList } from '@/feature/brand/queries/useGetBrandList';
import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import SelectedBrand from '@/feature/brand/ui/organisms/SelectedBrand';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useBrandListStore, useSelectedBrandsStore } from '@/shared/store';

const SelectBrandScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const { data: brands } = useGetBrandsList();
  const { setBrandList, brandList } = useBrandListStore();
  const { selectedList, selectBrand, removeBrand } = useSelectedBrandsStore();

  const { handleScroll, showFloatingButton, scrollToTop, scrollViewRef } =
    useHandleScroll();
  const { handleSelectedCompleted, actualCount, isDisabled } =
    useSelectedBrands(navigation);

  useEffect(() => {
    if (brands) {
      setBrandList(brands);
    }
  }, [brands]);

  return (
    <ScreenLayout className="relative">
      <SignupHeader
        text="회원가입"
        search
        onPressIn={() =>
          navigation.navigate('BrandSearch', { variant: 'signup' })
        }
      />

      <SignupIntro
        title={'좋아하는 포토부스\n[브랜드]를 선택해주세요'}
        sub={
          '좋아하는 브랜드를 저장하면 가까운 매장을\n검색 없이 바로 확인할 수 있어요!'
        }
      />

      <SelectedBrand onPressIn={removeBrand} selectedList={selectedList} />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="pt-[14px]"
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 100 }}>
        <BrandGridList
          brandList={brandList}
          selectedList={selectedList}
          onPress={selectBrand}
        />
      </ScrollView>

      <SelectButton
        actualSelectedCount={actualCount}
        disabled={isDisabled}
        handleNavigation={() => navigation.navigate('SignupSuccess')}
        handleSelectedCompleted={handleSelectedCompleted}
        scrollToTop={scrollToTop}
        showFloatingButton={showFloatingButton}
      />
    </ScreenLayout>
  );
};

export default SelectBrandScreen;
