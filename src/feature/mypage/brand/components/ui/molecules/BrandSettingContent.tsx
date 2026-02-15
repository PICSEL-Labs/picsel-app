import React, { RefObject } from 'react';

import { ScrollView } from 'react-native';

import BrandEmptyState from '../molecules/BrandEmptyState';
import BrandSettingGrid from '../organisms/BrandSettingGrid';

import { Brand } from '@/feature/brand/types';
import { BrandSettingMode } from '@/feature/mypage/brand/constants/brandSettingTexts';

interface Props {
  mode: BrandSettingMode;
  favoriteBrands: Brand[];
  allBrandsForAdd: Brand[];
  removeSelectedIds: string[];
  addSelectedIds: string[];
  favoriteBrandIds: Set<string>;
  toggleRemoveSelect: (brandId: string) => void;
  toggleAddSelect: (brandId: string) => void;
  scrollViewRef: RefObject<ScrollView | null>;
  onScroll: (event: any) => void;
}

const BrandSettingContent = ({
  mode,
  favoriteBrands,
  allBrandsForAdd,
  removeSelectedIds,
  addSelectedIds,
  favoriteBrandIds,
  toggleRemoveSelect,
  toggleAddSelect,
  scrollViewRef,
  onScroll,
}: Props) => {
  if (mode === 'add') {
    return (
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1 px-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <BrandSettingGrid
          brands={allBrandsForAdd}
          selectedIds={addSelectedIds}
          onPress={toggleAddSelect}
          disabledBrandIds={favoriteBrandIds}
        />
      </ScrollView>
    );
  }

  if (favoriteBrands.length === 0) {
    return <BrandEmptyState />;
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={onScroll}
      scrollEventThrottle={16}
      className="flex-1 px-2 pt-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 10 }}>
      <BrandSettingGrid
        brands={favoriteBrands}
        selectedIds={mode === 'remove' ? removeSelectedIds : []}
        onPress={mode === 'remove' ? toggleRemoveSelect : undefined}
      />
    </ScrollView>
  );
};

export default BrandSettingContent;
