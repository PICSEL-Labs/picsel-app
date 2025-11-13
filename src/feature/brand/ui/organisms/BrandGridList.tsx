import React from 'react';

import { ImageBackground, Pressable, Text, View } from 'react-native';
import Config from 'react-native-config';

import { Brand } from '../../types';

import { HighlightedText } from '@/shared/components/HighlightedText';
import CheckIcons from '@/shared/icons/CheckIcons';
import { chunkArray } from '@/shared/utils/arrayUtils';
import { defaultShadow } from '@/styles/shadows';

interface Props {
  brandList: Brand[];
  selectedList: {
    brandId: string;
    name: string;
  }[];
  onPress: (brandId: string, name: string) => void;
  keyword?: string;
  highlight?: boolean;
  excludeNoneBrand?: boolean;
}

const BrandGridList = ({
  brandList,
  selectedList,
  onPress,
  keyword = '',
  highlight = false,
  excludeNoneBrand = false,
}: Props) => {
  const filteredBrandList = excludeNoneBrand
    ? brandList.filter(brand => brand.brandId !== 'NONE')
    : brandList;
  return (
    <>
      {chunkArray(filteredBrandList, 3).map((row, rowIndex) => (
        <View key={rowIndex} className="mx-3 mb-6 flex-row justify-between">
          {row.map(item => {
            const isSelected = selectedList.some(
              selected => selected.brandId === item.brandId,
            );

            return (
              <View key={item.brandId} className="flex-1 items-center">
                <View style={defaultShadow} className="mb-[7px] rounded-full">
                  <Pressable onPress={() => onPress(item.brandId, item.name)}>
                    <ImageBackground
                      source={{ uri: Config.IMAGE_URL + item.iconImageUrl }}
                      className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                      {isSelected && (
                        <View className="w-full flex-1 items-center justify-center rounded-full bg-black/30">
                          <CheckIcons shape="white" width={24} height={24} />
                        </View>
                      )}
                    </ImageBackground>
                  </Pressable>
                </View>
                {highlight ? (
                  <HighlightedText
                    text={item.name}
                    keyword={keyword}
                    highlightColor="text-gray-900"
                    fontWeight="body-rg-02"
                    highlightWeight="headline-01"
                  />
                ) : (
                  <Text className="text-center text-gray-900 body-rg-02">
                    {item.name}
                  </Text>
                )}
              </View>
            );
          })}

          {/* 3개 이하일 경우 공백 채우기 */}
          {row.length < 3 &&
            Array.from({ length: 3 - row.length }).map((_, i) => (
              <View key={`empty-${i}`} className="flex-1" />
            ))}
        </View>
      ))}
    </>
  );
};

export default BrandGridList;
