import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';

import RemoveIcon from '@/assets/icons/remove.svg';
import SearchIcon from '@/assets/icons/search-icon.svg';
import { favoriteBrandApi } from '@/feature/brand/api/favoriteBrandApi';
import { useGetBrandsList } from '@/feature/brand/queries/useGetBrandList';
import { Brand } from '@/feature/brand/types/brandType';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { cn } from '@/shared/lib/cn';
import { useBrandListStore, useSelectedBrandsStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';
import { chunkArray } from '@/shared/utils/arrayUtils';

const SelectBrandScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const { data: brands } = useGetBrandsList();
  const { setBrandList, brandList } = useBrandListStore();
  const { selectedList, selectBrand, removeBrand } = useSelectedBrandsStore();

  const scrollViewRef = useRef<ScrollView>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const actualSelectedCount = selectedList.some(list => list.brandId === 'NONE')
    ? 0
    : selectedList.length;
  const disabled = selectedList.length > 0;

  useEffect(() => {
    if (brands) {
      const mergedBrands: Brand[] = [
        {
          brandId: 'NONE',
          name: '선호 브랜드 없음',
          iconImageUrl: '',
          displayOrder: -1,
        },
        ...(brands ?? []),
      ];
      setBrandList(mergedBrands);
    }
  }, [brands]);

  const handleSelectedCompleted = async () => {
    const brandIds = selectedList.map(value => value.brandId);

    try {
      const res = await favoriteBrandApi({ brandIds });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    navigation.navigate('SignupSuccess');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    const isTop = contentOffset.y <= 0;

    if (isBottom && !showFloatingButton) {
      setShowFloatingButton(true); // 한 번만 활성화
    }

    if (isTop && showFloatingButton) {
      setShowFloatingButton(false); // 최상단 도달 시 숨김
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <ScreenLayout className="relative">
      <View className="mx-3 p-2">
        {/* Header */}

        <Pressable
          className="mb-5 items-end"
          onPress={() => navigation.navigate('BrandSearch')}>
          <SearchIcon />
        </Pressable>

        <View className="my-1 gap-3">
          <Text className="text-[24px] font-bold leading-[36px] text-[#111114]">
            좋아하는 포토부스{'\n'}브랜드를 찜해주세요!
          </Text>
        </View>

        <View className="py-3">
          {selectedList.length > 0 && selectedList[0].brandId !== 'NONE' ? (
            <ScrollView horizontal className="flex-row space-x-2">
              {selectedList.map(item => (
                <View
                  key={item.brandId}
                  className="h-[50px] flex-row items-center justify-center bg-gray-400 px-3">
                  <Text className="mr-2 text-[16px] font-semibold text-black">
                    {item.name}
                  </Text>
                  <Pressable onPress={() => removeBrand(item.brandId)}>
                    <RemoveIcon />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className="h-[50px]">
              <Text className="text-[16px] font-normal leading-[22px] text-[#3B3E46]">
                좋아하는 브랜드로 저장하면 내 주변 가까운 매장을{'\n'}검색 없이
                바로 확인할 수 있어요.
              </Text>
            </View>
          )}
        </View>

        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          className="px-2 py-8"
          contentContainerStyle={{ paddingBottom: 250 }}>
          {chunkArray(brandList, 3).map((row, rowIndex) => (
            <View key={rowIndex} className="mb-4 flex-row justify-between">
              {row.map(item => {
                const isSelected = selectedList.some(
                  selected => selected.brandId === item.brandId,
                );

                return (
                  <Pressable
                    key={item.brandId}
                    className="flex-1 items-center"
                    onPress={() => selectBrand(item.brandId, item.name)}>
                    <ImageBackground
                      source={{ uri: Config.IMAGE_URL + item.iconImageUrl }}
                      className="mb-4 h-[72px] w-[72px] overflow-hidden rounded-full bg-gray-300">
                      {isSelected && (
                        <View className="flex-1 rounded-full bg-black/40" />
                      )}
                    </ImageBackground>
                    <Text className="text-center text-[14px] font-normal text-[#111114]">
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}

              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, i) => (
                  <View key={`empty-${i}`} className="mx-1 flex-1" />
                ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="absolute bottom-10 w-full items-center">
        <Pressable
          disabled={!disabled}
          onPress={
            actualSelectedCount
              ? handleSelectedCompleted
              : () => navigation.navigate('SignupSuccess')
          }
          className={cn(
            !disabled ? 'bg-gray-500' : 'bg-pink-500',
            'h-[56px] w-[330px] items-center justify-center rounded-[40px]',
          )}>
          <Text className="text-[20px] font-semibold text-white">
            선택 완료 ({actualSelectedCount})
          </Text>
        </Pressable>

        {/* ✅ 플로팅 버튼 */}
        {showFloatingButton && (
          <Pressable
            onPress={scrollToTop}
            className="absolute -top-12 right-3 h-[40px] w-[40px] items-center justify-center rounded-full bg-[#D9D9D9]">
            <Text>↑</Text>
          </Pressable>
        )}
      </View>
    </ScreenLayout>
  );
};

export default SelectBrandScreen;
