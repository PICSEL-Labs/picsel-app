import React, { useCallback, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BrandGridList from '@/feature/brand/ui/organisms/BrandGridList';
import NoResult from '@/feature/brand/ui/organisms/NoResult';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useBrandListStore, useFavoriteStore } from '@/shared/store';
import Button from '@/shared/ui/atoms/Button';
import Input from '@/shared/ui/atoms/Input';

const BrandSearchScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // ─── State ───
  const [brandName, setBrandName] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<
    { brandId: string; name: string }[]
  >([]);

  // ─── Store ───
  const { brandList } = useBrandListStore();
  const { optimisticFavorites } = useFavoriteStore();

  // ─── Derived Data ───
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

  // ─── Handlers ───
  const handleSelectBrand = useCallback(
    (brandId: string, name: string) => {
      if (favoriteBrandIds.has(brandId)) {
        return;
      }

      setSelectedBrands(prev => {
        const exists = prev.some(b => b.brandId === brandId);
        const next = exists
          ? prev.filter(b => b.brandId !== brandId)
          : [...prev, { brandId, name }];

        // 1개 이상 선택 시 키보드 내림
        if (next.length >= 1) {
          Keyboard.dismiss();
        }

        return next;
      });
    },
    [favoriteBrandIds],
  );

  const handleConfirm = useCallback(() => {
    if (selectedBrands.length === 0) {
      return;
    }

    const selectedIds = selectedBrands.map(b => b.brandId);
    navigation.navigate('BrandSettingScreen', {
      searchSelectedBrandIds: selectedIds,
    });
  }, [selectedBrands, navigation]);

  // ─── 이미 찜한 브랜드 + 현재 선택된 브랜드를 합쳐서 BrandGridList에 전달 ───
  const combinedSelectedList = useMemo(() => {
    const favoriteEntries = brandList
      .filter(b => favoriteBrandIds.has(b.brandId))
      .map(b => ({ brandId: b.brandId, name: b.name }));
    return [...favoriteEntries, ...selectedBrands];
  }, [brandList, favoriteBrandIds, selectedBrands]);

  return (
    <ScreenLayout>
      <MypageHeader
        title="브랜드 검색"
        onBackPress={() => navigation.goBack()}
      />

      <Input
        value={brandName}
        onChangeText={setBrandName}
        handleClear={() => setBrandName('')}
        placeholder="원하는 포토부스를 검색해보세요!"
        search
        close
        container="mt-5 pb-8"
      />

      {brandName.length > 0 && searchedList.length > 0 ? (
        <ScrollView
          className="px-2"
          showsVerticalScrollIndicator
          indicatorStyle="black"
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled">
          <BrandGridList
            brandList={searchedList}
            selectedList={combinedSelectedList}
            onPress={handleSelectBrand}
            keyword={brandName}
            highlight
          />
        </ScrollView>
      ) : (
        <NoResult visible={showNoResult} />
      )}

      {/* 선택완료 버튼 */}
      {selectedBrands.length > 0 && (
        <View className="px-4 pb-4">
          <Button
            className="w-full"
            text={`선택완료(${selectedBrands.length})`}
            textColor="white"
            onPress={handleConfirm}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default BrandSearchScreen;
