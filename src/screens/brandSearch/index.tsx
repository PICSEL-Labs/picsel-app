import React, { useCallback, useMemo, useState } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';

import SignupHeader from '@/feature/auth/signup/ui/organisms/SignupHeader';
import { useHandleScroll } from '@/feature/brand/model/hooks/useHandleScroll';
import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import NoResult from '@/feature/brand/ui/organisms/NoResult';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import FloatingButton from '@/shared/icons/FloatingButton';
import {
  useBrandListStore,
  useFavoriteStore,
  useSearchSelectedBrandsStore,
  useSelectedBrandsStore,
} from '@/shared/store';
import Button from '@/shared/ui/atoms/Button';
import Input from '@/shared/ui/atoms/Input';

export type BrandSearchParams = {
  variant: 'signup' | 'mypage';
};

const BrandSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ BrandSearch: BrandSearchParams }>>();
  const variant = route.params?.variant ?? 'signup';

  const [brandName, setBrandName] = useState('');
  const [mypageSelectedBrands, setMypageSelectedBrands] = useState<
    { brandId: string; name: string }[]
  >([]);

  const { brandList } = useBrandListStore();
  const { selectedList, selectBrand } = useSelectedBrandsStore();
  const { optimisticFavorites } = useFavoriteStore();
  const { setSearchSelectedBrandIds } = useSearchSelectedBrandsStore();
  const { showFloatingButton, handleScroll, scrollToTop, scrollViewRef } =
    useHandleScroll();

  const favoriteBrandIds = useMemo(
    () =>
      new Set(
        brandList
          .filter(b => optimisticFavorites[b.brandId] === true)
          .map(b => b.brandId),
      ),
    [brandList, optimisticFavorites],
  );

  const searchedList = useMemo(
    () =>
      brandList
        .filter(
          brand => brand.brandId !== 'NONE' && brand.name.includes(brandName),
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'ko')),
    [brandList, brandName],
  );

  const showNoResult = brandName.length > 0 && searchedList.length === 0;

  const mypageCombinedSelectedList = useMemo(() => {
    if (variant !== 'mypage') {
      return [];
    }
    const favoriteEntries = brandList
      .filter(b => favoriteBrandIds.has(b.brandId))
      .map(b => ({ brandId: b.brandId, name: b.name }));
    return [...favoriteEntries, ...mypageSelectedBrands];
  }, [variant, brandList, favoriteBrandIds, mypageSelectedBrands]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectBrandMypage = useCallback(
    (brandId: string, name: string) => {
      if (favoriteBrandIds.has(brandId)) {
        return;
      }

      setMypageSelectedBrands(prev => {
        const exists = prev.some(b => b.brandId === brandId);
        const next = exists
          ? prev.filter(b => b.brandId !== brandId)
          : [...prev, { brandId, name }];

        if (next.length >= 1) {
          Keyboard.dismiss();
        }

        return next;
      });
    },
    [favoriteBrandIds],
  );

  const handleConfirmMypage = useCallback(() => {
    if (mypageSelectedBrands.length === 0) {
      return;
    }

    const selectedIds = mypageSelectedBrands.map(b => b.brandId);
    setSearchSelectedBrandIds(selectedIds);
    navigation.goBack();
  }, [mypageSelectedBrands, setSearchSelectedBrandIds, navigation]);

  const gridSelectedList =
    variant === 'signup' ? selectedList : mypageCombinedSelectedList;

  const gridOnPress =
    variant === 'signup' ? selectBrand : handleSelectBrandMypage;

  return (
    <ScreenLayout>
      {variant === 'signup' ? (
        <SignupHeader text="브랜드 검색" back onPressIn={handleGoBack} />
      ) : (
        <MypageHeader title="브랜드 검색" onBackPress={handleGoBack} />
      )}

      <Input
        value={brandName}
        onChangeText={setBrandName}
        handleClear={() => setBrandName('')}
        placeholder="원하는 포토부스를 검색해보세요!"
        search
        close
        container="mt-5 pb-2"
      />

      {brandName.length > 0 && searchedList.length > 0 ? (
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator
          indicatorStyle="black"
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled">
          <BrandGridList
            brandList={searchedList}
            selectedList={gridSelectedList}
            onPress={gridOnPress}
            keyword={brandName}
            highlight
            disabledBrandIds={
              variant === 'mypage' ? favoriteBrandIds : undefined
            }
          />
        </ScrollView>
      ) : (
        <NoResult visible={showNoResult} />
      )}

      {showFloatingButton && (
        <Pressable
          onPressIn={scrollToTop}
          style={{
            position: 'absolute',
            bottom: 105,
            right: 24,
            zIndex: 10,
          }}>
          <FloatingButton shape="floating" />
        </Pressable>
      )}

      {variant === 'mypage' && mypageSelectedBrands.length > 0 && (
        <View className="px-4 pb-2 pt-2">
          <Button
            className="w-full"
            text={`선택완료(${mypageSelectedBrands.length})`}
            textColor="white"
            onPress={handleConfirmMypage}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default BrandSearchScreen;
