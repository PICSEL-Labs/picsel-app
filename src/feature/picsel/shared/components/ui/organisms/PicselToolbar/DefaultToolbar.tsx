import React from 'react';

import { Pressable, Text, View } from 'react-native';

import CheckRoundIcons from '@/shared/icons/CheckRound';
import FilterIcons from '@/shared/icons/FilterIcons';
import SortIcons from '@/shared/icons/SortIcons';
import ViewModeIcons from '@/shared/icons/ViewModeIcons';

interface Props {
  totalPhotos: number;
  listViewMode?: 'list' | 'textList';
  disabled?: boolean;
  onToggleSelecting: () => void;
  onSort?: () => void;
  onFilter?: () => void;
  onToggleViewMode?: () => void;
}

const DefaultToolbar = ({
  totalPhotos,
  listViewMode,
  disabled = false,
  onToggleSelecting,
  onSort,
  onFilter,
  onToggleViewMode,
}: Props) => {
  const displayCount = totalPhotos > 999 ? '999+' : totalPhotos;
  const hasViewModeToggle = listViewMode && onToggleViewMode;

  const renderLeftContent = () => {
    if (!onFilter) {
      return null;
    }

    if (hasViewModeToggle) {
      return (
        <Pressable onPress={onToggleViewMode}>
          <ViewModeIcons
            shape={listViewMode === 'list' ? 'list' : 'text-list'}
            width={24}
            height={24}
          />
        </Pressable>
      );
    }

    return (
      <Text className="text-gray-900 body-rg-03" style={{ lineHeight: 0 }}>
        전체 {displayCount}
      </Text>
    );
  };

  return (
    <View
      style={disabled ? { opacity: 0.4 } : undefined}
      pointerEvents={disabled ? 'none' : 'auto'}
      className={`flex-row items-center bg-white/90 px-6 py-4 ${onFilter ? 'justify-between' : 'justify-end'}`}>
      {renderLeftContent()}

      <View className="flex-row items-center space-x-4">
        {onFilter && (
          <Pressable onPress={onFilter} disabled={disabled}>
            <FilterIcons height={24} width={24} shape="gray" />
          </Pressable>
        )}

        <Pressable
          onPress={onSort}
          disabled={disabled}
          className={!onFilter ? 'mr-5' : ''}>
          <SortIcons height={24} width={24} shape="sort" />
        </Pressable>

        <Pressable onPress={onToggleSelecting} disabled={disabled}>
          <CheckRoundIcons height={24} width={24} shape="check-round" />
        </Pressable>
      </View>
    </View>
  );
};

export default DefaultToolbar;
