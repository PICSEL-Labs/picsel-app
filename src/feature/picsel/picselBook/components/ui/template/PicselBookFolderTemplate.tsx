import React from 'react';

import { View } from 'react-native';

import { PicselBookEditType, PicselBookSortType } from '../../../types';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import PhotoTextListView from '@/feature/picsel/picselBook/components/ui/organisms/PhotoTextListView';
import { usePicselBookFolder } from '@/feature/picsel/picselBook/hooks/usePicselBookFolder';
import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import AddButton from '@/feature/picsel/shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '@/feature/picsel/shared/components/ui/atoms/Button/FunctionButton';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import UploadTooltip from '@/feature/picsel/shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import { useSortActionSheet } from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  bookId: string;
  onBack: () => void;
}

const PicselBookFolderTemplate = ({ bookId, onBack }: Props) => {
  const {
    // 데이터
    photoData,
    bookTitle,
    isLoading,
    totalPhotos,

    // 뷰 모드
    viewMode,
    handleToggleViewMode,

    // 선택 모드
    isSelecting,
    selectedPhotos,
    toggleSelection,
    selectAll,
    handleEnterSelecting,
    handleExitSelecting,
    selectionBottomSheetRef,

    // 스크롤
    showUpButton,
    flatListRef,
    handleScroll,
    scrollToTop,

    // 기능 버튼
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    // 사진 액션
    handleDelete,
    handleMove,

    // 유틸리티
    formatPhotoCount,
  } = usePicselBookFolder({ bookId });

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: PicselBookSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

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
        title={`${bookTitle}(${formatPhotoCount(totalPhotos)})`}
        onBack={onBack}
        showToggle={true}
        onTogglePress={showEditSheet}
      />

      {photoData.length !== 0 && (
        <PixelToolbar
          listViewMode={viewMode}
          totalPhotos={totalPhotos}
          selectedCount={selectedPhotos.length}
          isSelecting={isSelecting}
          onToggleSelecting={handleEnterSelecting}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={handleExitSelecting}
          onFilter={showBrandFilterSheet}
          onSort={showSortSheet}
          onToggleViewMode={handleToggleViewMode}
        />
      )}

      {photoData.length === 0 && !isLoading ? (
        <EmptyStateLayout
          floatingButton={
            <>
              <UploadTooltip bottom={120} />
              <View className="absolute bottom-14 right-1">
                {showFunctionButtons ? (
                  <FunctionButton
                    onAlbumPress={handleAlbumPress}
                    onQrPress={handleQrPress}
                    onClose={closeFunctionButtons}
                  />
                ) : (
                  <AddButton onPress={toggleFunctionButtons} />
                )}
              </View>
            </>
          }>
          <EmptyMessage message="픽셀북이 비어있어요" />
        </EmptyStateLayout>
      ) : (
        <>
          {viewMode === 'list' ? (
            <PhotoListView
              ref={flatListRef}
              data={photoData}
              selectedPhotos={selectedPhotos}
              isSelecting={isSelecting}
              isLoading={isLoading}
              onScroll={handleScroll}
              onToggleSelection={toggleSelection}
            />
          ) : (
            <PhotoTextListView
              ref={flatListRef}
              data={photoData}
              selectedPhotos={selectedPhotos}
              isSelecting={isSelecting}
              isLoading={isLoading}
              onScroll={handleScroll}
              onToggleSelection={toggleSelection}
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
