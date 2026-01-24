import React from 'react';

import { View } from 'react-native';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { useMonthFolder } from '@/feature/picsel/myPicsel/hooks/useMonthFolder';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  month: string;
  onBack: () => void;
}

const MonthFolderTemplate = ({ year, month, onBack }: Props) => {
  const {
    photoData,
    isLoading,
    totalPhotos,

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
  } = useMonthFolder({ year, month });

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  return (
    <ScreenLayout>
      <FolderHeader title={`${year}년 ${month}`} onBack={onBack} />

      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
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
        showYear={false}
      />

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {!isSelecting && (
        <View className="absolute -bottom-4 right-4">
          <FloatingActionButtons
            isSelecting={isSelecting}
            showUpButton={showUpButton}
            showFunctionButtons={showFunctionButtons}
            onToggleFunctionButtons={toggleFunctionButtons}
            onScrollToTop={scrollToTop}
            onAlbumPress={handleAlbumPress}
            onQrPress={handleQrPress}
            onCloseFunctionButtons={closeFunctionButtons}
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default MonthFolderTemplate;
