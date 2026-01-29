import React from 'react';

import DefaultToolbar from './DefaultToolbar';
import SelectionToolbar from './SelectionToolbar';

interface Props {
  totalPhotos: number;
  isSelecting: boolean;
  selectedCount: number;
  listViewMode?: 'list' | 'textList';
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
      onToggleSelecting={onToggleSelecting}
      onSort={onSort}
      onFilter={onFilter}
      onToggleViewMode={onToggleViewMode}
    />
  );
};

export default PixelToolbar;
