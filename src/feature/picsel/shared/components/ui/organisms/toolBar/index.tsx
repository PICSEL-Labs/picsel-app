import React from 'react';

import DefaultToolbar from './DefaultToolbar';
import SelectionToolbar from './SelectionToolbar';

interface Props {
  totalPhotos: number;
  isSelecting: boolean;
  selectedCount: number;
  listViewMode?: 'list' | 'textList';
  disabled?: boolean;
  onToggleSelecting: () => void;
  onSelectAll: () => void;
  onClose: () => void;
  onSort?: () => void;
  onFilter?: () => void;
  onToggleViewMode?: () => void;
}

const PixelToolbar = ({
  totalPhotos,
  isSelecting,
  selectedCount,
  listViewMode,
  disabled = false,
  onToggleSelecting,
  onSelectAll,
  onClose,
  onSort,
  onFilter,
  onToggleViewMode,
}: Props) => {
  if (isSelecting) {
    return (
      <SelectionToolbar
        totalPhotos={totalPhotos}
        selectedCount={selectedCount}
        onSelectAll={onSelectAll}
        onClose={onClose}
      />
    );
  }

  return (
    <DefaultToolbar
      totalPhotos={totalPhotos}
      listViewMode={listViewMode}
      disabled={disabled}
      onToggleSelecting={onToggleSelecting}
      onSort={onSort}
      onFilter={onFilter}
      onToggleViewMode={onToggleViewMode}
    />
  );
};

export default PixelToolbar;
