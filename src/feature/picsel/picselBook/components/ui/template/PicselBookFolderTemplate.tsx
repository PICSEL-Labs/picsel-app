import React, { useCallback, useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { PICSEL_BOOK_EDIT_OPTIONS, PicselBookEditType } from '../../../types';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import PhotoTextListView from '@/feature/picsel/picselBook/components/ui/organisms/PhotoTextListView';
import { usePicselBookActions } from '@/feature/picsel/picselBook/hooks/usePicselBookActions';
import { usePicselBookFolder } from '@/feature/picsel/picselBook/hooks/usePicselBookFolder';
import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import SparkleBackground from '@/feature/picsel/shared/components/ui/atoms/SparkleBackground';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import UploadTooltip from '@/feature/picsel/shared/components/ui/molecules/UploadTooltip';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';
import { useSortActionSheet } from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
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
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

  const {
    editNameBottomSheetRef,
    editCoverBottomSheetRef,
    bookCoverPhoto,
    handleEdit: handleEditAction,
    handleEditSubmit,
    handleChangeCover,
    handleCoverEditSubmit,
  } = usePicselBookActions();

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

  // 커버 편집: SelectPhoto에서 돌아왔을 때만 바텀시트 자동 오픈
  useEffect(() => {
    if (isFocused && bookCoverPhoto) {
      editCoverBottomSheetRef.current?.present();
    }
  }, [isFocused, bookCoverPhoto]);

  const handleEdit = (editType: PicselBookEditType) => {
    if (editType === 'editName') {
      handleEditAction(bookId, bookName);
    } else if (editType === 'editCover') {
      handleChangeCover(bookId);
    }
  };

  const { showSortSheet: showEditSheet } = useSortActionSheet({
    onSort: handleEdit,
    options: PICSEL_BOOK_EDIT_OPTIONS,
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
          <View className="flex-1 pb-14">
            <SparkleBackground />
            <EmptyMessage
              message={
                isFilterActive
                  ? '선택한 브랜드의 사진이 없어요'
                  : '픽셀북이 비어있어요'
              }
            />
          </View>
        </EmptyStateLayout>
      ) : (
        <>
          {viewMode === 'list' ? (
            <PhotoListView
              showYear={true}
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

      <PicselBookBottomSheet
        ref={editNameBottomSheetRef}
        onSubmit={newName =>
          handleEditSubmit(newName, {
            onSuccess: () => navigation.setParams({ bookName: newName }),
          })
        }
        initialBookName={bookName}
        mode="editName"
      />

      <PicselBookBottomSheet
        ref={editCoverBottomSheetRef}
        onSubmit={(_bookName, coverType) => handleCoverEditSubmit(coverType)}
        mode="editCover"
        picselbookId={bookId}
        coverPhotoUri={bookCoverPhoto}
      />
    </ScreenLayout>
  );
};

export default PicselBookFolderTemplate;
