import React from 'react';

import { Pressable, Text, View } from 'react-native';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import Input from '@/shared/ui/atoms/Input';
import { commonShadow } from '@/styles/shadow';

interface Props {
  brandName: string;
  onBrandNameChange: (text: string) => void;
  onClearBrandName: () => void;
  isFilterActive: boolean;
  onToggleFilter: () => void;
  showSearchButton: boolean;
  onLocationSearch: () => void;
}

// 해당 컴포넌트 수린님 코드와 병합 필요.
const MapControls = ({
  brandName,
  onBrandNameChange,
  onClearBrandName,
  isFilterActive,
  onToggleFilter,
  showSearchButton,
  onLocationSearch,
}: Props) => {
  return (
    <View className="absolute left-0 right-0 top-0 z-10 px-4 pt-[50px]">
      <Input
        value={brandName}
        onChangeText={onBrandNameChange}
        handleClear={onClearBrandName}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        container="pb-[8px]"
      />

      <BrandFilterButton
        variant={isFilterActive ? 'active' : 'inactive'}
        onPress={onToggleFilter}
      />

      {showSearchButton && (
        <Pressable
          className="h-[40px] w-[149px] flex-shrink-0 flex-row items-center justify-center self-center rounded-[27px] bg-neutral-white"
          onPress={onLocationSearch}
          style={commonShadow}>
          <ReplayIcons height={24} width={24} shape="default" />
          <Text className="ml-1 text-semantic-info body-rg-02">
            현 지도에서 검색
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default MapControls;
