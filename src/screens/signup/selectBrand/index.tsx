import React, { useEffect } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import { SELECT_BRAND_TEXT } from '@/feature/auth/signup/constants/selectBrand';
import SignupHeader from '@/feature/auth/signup/ui/organisms/SignupHeader';
import SignupIntro from '@/feature/auth/signup/ui/organisms/SignupIntro';
import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import { useSelectedBrands } from '@/feature/brand/model/hooks/useSelectedBrands';
import { useGetBrandsList } from '@/feature/brand/queries/useGetBrandList';
import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import SelectedBrand from '@/feature/brand/ui/organisms/SelectedBrand';
import { SignupNavigationProps } from '@/navigation/route/signup';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useBrandListStore, useSelectedBrandsStore } from '@/shared/store';
import { useToastStore } from '@/shared/store/ui/toast';

const SelectBrandScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();
  const route = useRoute<RouteProp<SignupNavigationProps, 'SelectBrand'>>();
  const { showToast } = useToastStore();

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

  useEffect(() => {
    if (route.params?.marketingConsent) {
      showToast(SELECT_BRAND_TEXT.MARKETING_TOAST, { height: 60 });
    }
  }, []);

  return (
    <ScreenLayout className="relative">
      <SignupHeader
        text={SELECT_BRAND_TEXT.HEADER}
        search
        onPressIn={() =>
          navigation.navigate('BrandSearch', { variant: 'signup' })
        }
      />

      <SignupIntro
        title={SELECT_BRAND_TEXT.TITLE}
        sub={SELECT_BRAND_TEXT.SUB}
      />

      <SelectedBrand onPressIn={removeBrand} selectedList={selectedList} />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="pt-[14px]"
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 50 }}>
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
