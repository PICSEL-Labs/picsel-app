import React from 'react';

import { ImageBackground, Pressable, Text, View } from 'react-native';

import { Brand } from '@/feature/brand/types';
import { chunkArray } from '@/feature/brand/utils/arrayUtils';
import CheckIcons from '@/shared/icons/CheckIcons';
import { defaultShadow } from '@/shared/styles/shadows';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  brands: Brand[];
  selectedIds: string[];
  onPress?: (brandId: string) => void;
  disabledBrandIds?: Set<string>;
}

const COLUMNS = 3;

const BrandSettingGrid = ({
  brands,
  selectedIds,
  onPress,
  disabledBrandIds,
}: Props) => {
  return (
    <>
      {chunkArray(brands, COLUMNS).map((row, rowIndex) => (
        <View key={rowIndex} className="mb-6 flex-row justify-between py-1">
          {row.map(item => {
            const isSelected = selectedIds.includes(item.brandId);
            const isDisabled = disabledBrandIds?.has(item.brandId) ?? false;

            return (
              <View
                key={item.brandId}
                className="flex-1 items-center"
                style={isDisabled ? { opacity: 0.35 } : undefined}>
                <View style={defaultShadow} className="mb-[7px] rounded-full">
                  <Pressable
                    onPress={onPress ? () => onPress(item.brandId) : undefined}
                    disabled={isDisabled}>
                    <ImageBackground
                      source={{ uri: getImageUrl(item.iconImageUrl) }}
                      className="h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                      {isSelected && !isDisabled && (
                        <View className="w-full flex-1 items-center justify-center rounded-full bg-black/30">
                          <CheckIcons shape="white" width={24} height={24} />
                        </View>
                      )}
                    </ImageBackground>
                  </Pressable>
                </View>
                <Text
                  className="text-center text-gray-900 body-rg-02"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
              </View>
            );
          })}

          {row.length < COLUMNS &&
            Array.from({ length: COLUMNS - row.length }).map((_, i) => (
              <View key={`empty-${i}`} className="flex-1" />
            ))}
        </View>
      ))}
    </>
  );
};

export default BrandSettingGrid;
