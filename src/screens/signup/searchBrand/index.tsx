import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import NoResult from '@/feature/brand/ui/organisms/NoResult';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useBrandListStore, useSelectedBrandsStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';
import Input from '@/shared/ui/atoms/Input';
import SignupHeader from '@/shared/ui/organisms/SignupHeader';

const SearchBrandScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const [brandName, setBrandName] = useState('');

  const { brandList } = useBrandListStore();
  const { selectedList, selectBrand } = useSelectedBrandsStore();

  const searchedList = brandList
    .filter(brand => brand.name.includes(brandName))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const showNoResult = brandName.length > 0 && searchedList.length === 0;

  return (
    <ScreenLayout>
      <SignupHeader
        text="브랜드 검색"
        back
        onPressIn={() => navigation.goBack()}
      />

      <Input
        value={brandName}
        onChangeText={brand => setBrandName(brand)}
        handleClear={() => setBrandName('')}
        placeholder="원하는 포토부스를 검색해보세요"
        search
        close
        container="mt-5 pb-8"
      />

      {brandName.length > 0 && searchedList.length > 0 ? (
        <ScrollView
          className="px-2"
          showsVerticalScrollIndicator
          indicatorStyle="black"
          contentContainerStyle={{ paddingBottom: 50 }}>
          <BrandGridList
            brandList={searchedList}
            selectedList={selectedList}
            onPress={selectBrand}
            keyword={brandName}
            highlight
          />
        </ScrollView>
      ) : (
        <NoResult visible={showNoResult} />
      )}
    </ScreenLayout>
  );
};

export default SearchBrandScreen;
