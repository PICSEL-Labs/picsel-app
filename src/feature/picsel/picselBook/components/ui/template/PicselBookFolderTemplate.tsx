import React, { useCallback, useState } from 'react';

import { PicselBookEditType } from '../../../types';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import PhotoTextListView from '@/feature/picsel/picselBook/components/ui/organisms/PhotoTextListView';
import { usePicselBookFolder } from '@/feature/picsel/picselBook/hooks/usePicselBookFolder';
import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import UploadTooltip from '@/feature/picsel/shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';
import { useSortActionSheet } from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  bookId: string;
  bookName?: string;
  onBack: () => void;
  onPhotoPress: (picselId: string) => void;
}

const PicselBookFolderTemplate = ({
  bookId,
  bookName = '',
  onBack,
  onPhotoPress,
}: Props) => {
  const {
    photoData,
    rawData,
    isLoading,
    totalPhotos,

    showSortSheet,

    isFilterActive,

    viewMode,
    handleToggleViewMode,

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

    formatPhotoCount,

    handleEndReached,
  } = usePicselBookFolder({ bookId });

  const [showingSkeleton, setShowingSkeleton] = useState(false);
  const handleShowSkeletonChange = useCallback((show: boolean) => {
    setShowingSkeleton(show);
  }, []);

  // TODO: 편집 로직 구현
  const handleEdit = (editType: PicselBookEditType) => {
    console.log('편집 타입:', editType);
  };

  const { showSortSheet: showEditSheet } = useSortActionSheet({
    onSort: handleEdit,
    options: [
      { type: 'editName', label: '이름 편집' },
      { type: 'editCover', label: '커버사진 편집' },
    ],
  });

  return (
    <ScreenLayout>
      <FolderHeader
        title={`${bookName}(${formatPhotoCount(totalPhotos)})`}
        onBack={onBack}
        showToggle={true}
        onTogglePress={showEditSheet}
      />

      {(photoData.length !== 0 || isFilterActive) && (
        <PixelToolbar
          listViewMode={viewMode}
          totalPhotos={totalPhotos}
          selectedCount={selectedPhotos.length}
          isSelecting={isSelecting}
          disabled={showingSkeleton}
          onToggleSelecting={handleEnterSelecting}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={handleExitSelecting}
          isFilterActive={isFilterActive}
          onFilter={() => showBrandFilterSheet('picselBook')}
          onSort={showSortSheet}
          onToggleViewMode={handleToggleViewMode}
        />
      )}

      {photoData.length === 0 && !isLoading ? (
        <EmptyStateLayout
          floatingButton={
            !isFilterActive ? (
              <FloatingActionButtons
                isSelecting={false}
                showUpButton={false}
                showFunctionButtons={showFunctionButtons}
                onScrollToTop={scrollToTop}
                onToggleFunctionButtons={toggleFunctionButtons}
                onAlbumPress={handleAlbumPress}
                onQrPress={handleQrPress}
                onCloseFunctionButtons={closeFunctionButtons}
                tooltip={<UploadTooltip />}
                noTabBar
              />
            ) : undefined
          }>
          <EmptyMessage
            message={
              isFilterActive
                ? '선택한 브랜드의 사진이 없어요'
                : '픽셀북이 비어있어요'
            }
          />
        </EmptyStateLayout>
      ) : (
        <>
          {viewMode === 'list' ? (
            <PhotoListView
              showYear={false}
              ref={flatListRef}
              data={photoData}
              selectedPhotos={selectedPhotos}
              isSelecting={isSelecting}
              isLoading={isLoading}
              onScroll={handleScroll}
              onToggleSelection={toggleSelection}
              onPhotoPress={onPhotoPress}
              onEndReached={handleEndReached}
              onShowSkeletonChange={handleShowSkeletonChange}
            />
          ) : (
            <PhotoTextListView
              ref={flatListRef}
              data={rawData}
              selectedPhotos={selectedPhotos}
              isSelecting={isSelecting}
              isLoading={isLoading}
              onScroll={handleScroll}
              onToggleSelection={toggleSelection}
              onPhotoPress={onPhotoPress}
              onEndReached={handleEndReached}
              onShowSkeletonChange={handleShowSkeletonChange}
            />
          )}
          <FloatingActionButtons
            isSelecting={isSelecting}
            showUpButton={showUpButton}
            showFunctionButtons={showFunctionButtons}
            onScrollToTop={scrollToTop}
            onToggleFunctionButtons={toggleFunctionButtons}
            onAlbumPress={handleAlbumPress}
            onQrPress={handleQrPress}
            onCloseFunctionButtons={closeFunctionButtons}
            noTabBar
          />
        </>
      )}

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </ScreenLayout>
  );
};

export default PicselBookFolderTemplate;
