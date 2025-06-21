import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import Config from 'react-native-config';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import BackIcon from '@/assets/icons/arrow/left-arrow.svg';
import SearchIcon from '@/assets/icons/search-gray-icon.svg';
import { HighlightedText } from '@/shared/components/HighlightedText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useBrandListStore, useSelectedBrandsStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';
import { chunkArray } from '@/shared/utils/arrayUtils';

const BrandSearchScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const [brandName, setBrandName] = useState('');

  const { brandList } = useBrandListStore();
  const { selectedList, selectBrand } = useSelectedBrandsStore();

  const searchedList = brandList
    .filter(brand => brand.name.includes(brandName))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return (
    <ScreenLayout>
      <View className="mx-3 p-2">
        {/* Header */}
        <View className="flex-row items-center space-x-4">
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon />
          </Pressable>

          <View className="flex-1 justify-center">
            <SearchIcon className="absolute left-3" />
            <TextInput
              value={brandName}
              onChangeText={brand => setBrandName(brand)}
              placeholder="원하는 포토부스를 검색해보세요"
              placeholderTextColor="#CACACB"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              className="h-[40px] border px-10 text-[14px] font-light text-black"
            />
          </View>
        </View>

        {brandName.length > 0 ? (
          searchedList.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="px-2 py-8"
              contentContainerStyle={{ paddingBottom: 50 }}>
              {chunkArray(searchedList, 3).map((row, rowIndex) => (
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
                        <HighlightedText
                          text={item.name}
                          keyword={brandName}
                          leading="leading-0"
                          fontSize="text-[14px]"
                          highlightColor="#111114"
                          fontWeight="font-normal"
                        />
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
          ) : (
            // 검색결과 없을 경우 TEXT
            <View className="h-[70%] w-full items-center justify-center gap-2">
              <Text className="text-[20px] font-extrabold text-[#26272C]">
                검색결과가 없어요
              </Text>
            </View>
          )
        ) : (
          <View className="h-[70%] w-full items-center justify-center">
            <Image source={require('@/assets/images/input-background.png')} />
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default BrandSearchScreen;
