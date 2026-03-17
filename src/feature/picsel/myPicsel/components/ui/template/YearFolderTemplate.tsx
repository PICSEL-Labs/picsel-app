import React, { useCallback, useState } from 'react';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { useYearFolder } from '@/feature/picsel/myPicsel/hooks/useYearFolder';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  onBack: () => void;
}

const YearFolderTemplate = ({ year, onBack }: Props) => {
  const {
    photoData,
    isLoading,
    totalPhotos,

    showSortSheet,

    isSelecting,
    selectedPhotos,
    toggleSelection,
    selectAll,
    handleEnterSelecting,
    handleExitSelecting,
    selectionBottomSheetRef,

    showUpButton,
    flatListRef,
    handleScroll,
    scrollToTop,

    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    handleDelete,
    handleMove,
  } = useYearFolder({ year });

  const [showingSkeleton, setShowingSkeleton] = useState(false);
  const handleShowSkeletonChange = useCallback((show: boolean) => {
    setShowingSkeleton(show);
  }, []);

  return (
    <ScreenLayout>
      <FolderHeader title={`${year}년`} onBack={onBack} />

      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        disabled={showingSkeleton}
        onToggleSelecting={handleEnterSelecting}
        onSelectAll={() => selectAll(totalPhotos, photoData)}
        onClose={handleExitSelecting}
        onSort={showSortSheet}
        onFilter={showBrandFilterSheet}
      />

      <PhotoListView
        ref={flatListRef}
        data={photoData}
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        onToggleSelection={toggleSelection}
        isLoading={isLoading}
        onScroll={handleScroll}
        showYear={true}
        onShowSkeletonChange={handleShowSkeletonChange}
      />

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      <FloatingActionButtons
        isSelecting={isSelecting}
        showUpButton={showUpButton}
        showFunctionButtons={showFunctionButtons}
        onToggleFunctionButtons={toggleFunctionButtons}
        onScrollToTop={scrollToTop}
        onAlbumPress={handleAlbumPress}
        onQrPress={handleQrPress}
        onCloseFunctionButtons={closeFunctionButtons}
        noTabBar
      />
    </ScreenLayout>
  );
};

export default YearFolderTemplate;
