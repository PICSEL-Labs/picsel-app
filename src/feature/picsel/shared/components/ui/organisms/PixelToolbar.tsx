import React from 'react';

import { Pressable, Text, View } from 'react-native';

import CheckRoundIcons from '@/shared/icons/CheckRound';
import CloseIcons from '@/shared/icons/CloseIcons';
import FilterIcons from '@/shared/icons/FilterIcons';
import SortIcons from '@/shared/icons/SortIcons';
import { cn } from '@/shared/lib/cn';

interface Props {
  totalPhotos: number;
  isSelecting: boolean;
  selectedCount: number;
  onToggleSelecting: () => void;
  onSelectAll: () => void;
  onClose: () => void;
  onSort?: () => void;
  onFilter?: () => void;
}

const PixelToolbar = ({
  totalPhotos,
  isSelecting,
  onToggleSelecting,
  onSelectAll,
  selectedCount,
  onClose,
  onSort,
  onFilter,
}: Props) => {
  const displayCount = totalPhotos > 999 ? '999+' : totalPhotos;
  const isAllSelected = selectedCount === totalPhotos && totalPhotos > 0;

  if (isSelecting) {
    return (
      <View className="bg-white px-6 py-4">
        {/* 선택 모드 헤더 */}
        <View className="mb-3 flex-row items-center justify-between">
          <Pressable
            onPress={onSelectAll}
            className="flex-row items-center space-x-0.5">
            {/* 전체선택 상태에 따라 아이콘 분기 */}
            {isAllSelected ? (
              <CheckRoundIcons shape="check-round" width={24} height={24} />
            ) : (
              <CheckRoundIcons shape="default" width={24} height={24} />
            )}
            <Text
              className={cn(
                `${isAllSelected ? 'text-primary-black' : 'text-gray-600'} body-rg-02`,
              )}>
              전체 선택
            </Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <CloseIcons shape="black" width={24} height={24} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between bg-white px-6 py-4">
      <Text className="text-gray-900 body-rg-03">전체 {displayCount}</Text>

      <View className="flex-row items-center space-x-4">
        {/* 브랜드 필터 */}
        <Pressable onPress={onFilter}>
          <FilterIcons height={24} width={24} shape="gray" />
        </Pressable>

        {/* 정렬 */}
        <Pressable onPress={onSort}>
          <SortIcons height={24} width={24} shape="sort" />
        </Pressable>

        {/* 사진 선택 */}
        <Pressable onPress={onToggleSelecting}>
          <CheckRoundIcons height={24} width={24} shape="check-round" />
        </Pressable>
      </View>
    </View>
  );
};

export default PixelToolbar;
