import React from 'react';

import { FlatList, Text, View } from 'react-native';

import BottomSheetBrandImage from '../../atoms/BottomSheetBrandImage';

import { NearByBrand } from '@/feature/map/types';

interface Props {
  brands: NearByBrand[];
}

const NearbyBrandList = ({ brands }: Props) => {
  return (
    <FlatList
      className="h-[120px] px-6"
      horizontal
      data={brands}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <View className="mr-3 mt-3 w-[90px] items-center">
          <BottomSheetBrandImage
            isFavorite={item.isFavorite}
            imageUrl={item.brandIconImageUrl}
            nearBy
          />

          <Text
            className="mt-2 text-center text-gray-900 body-rg-02"
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.brandName}
          </Text>
        </View>
      )}
    />
  );
};

export default NearbyBrandList;
