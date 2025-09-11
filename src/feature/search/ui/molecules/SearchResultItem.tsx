import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { HighlightedText } from '@/shared/components/HighlightedText';
import SparkleImages from '@/shared/images/Sparkle';
import { formatDistance } from '@/shared/utils/distance';

interface Props {
  kind: 'station' | 'store' | 'administrativeDistrict';
  title: string; // 지하철역명/매장명/지역명
  subtitle?: string; // 주소
  distanceMeters?: number; // 거리
  onPress?: () => void;
  highlightKeyword?: string | string[];
}

const SearchResultItem = ({
  title,
  kind,
  subtitle,
  distanceMeters,
  onPress,
  highlightKeyword,
}: Props) => {
  const hasKeyword = kind === 'store' || kind === 'administrativeDistrict';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center border-b border-gray-50 bg-white py-3">
      <View className="mr-3 items-center justify-center">
        <SparkleImages shape="icon" height={32} width={32} />
      </View>

      <View className="flex-1">
        <Text numberOfLines={1}>
          <HighlightedText
            text={title}
            keyword={hasKeyword && highlightKeyword}
            fontWeight="body-rg-03"
            textAlign="text-left"
            highlightColor="text-gray-900"
            highlightWeight="headline-02"
          />
        </Text>
        <View className="flex-row items-baseline justify-between">
          {!!subtitle && (
            <Text
              className="mr-2 flex-1 text-gray-400 body-rg-02"
              numberOfLines={1}
              ellipsizeMode="tail">
              {subtitle}
            </Text>
          )}
          {distanceMeters && (
            <Text className="text-gray-600 body-rg-01">
              {formatDistance(distanceMeters)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default SearchResultItem;
