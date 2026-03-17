import React, { useCallback, useState } from 'react';

import { View } from 'react-native';

import { usePicselBook } from '../../../hooks/usePicselBook';
import AddBookButton from '../organisms/AddBookButton';
import PicselBookList from '../organisms/PicselBookList';

import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import SparkleBackground from '@/feature/picsel/shared/components/ui/atoms/SparkleBackground';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';

const PicselBookTemplate = () => {
  const {
    books,
    isLoading,
    totalBooks,
    hasBooks,

    isSelecting,
    selectedBookIds,
    handleEnterSelecting,
    handleExitSelecting,
    handleSelectAll,
    selectionSheetRef,

    showUpButton,
    scrollToTop,

    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    handleAddBook,
    handleSubmit,
    handleBookPress,
    handleDeletePress,
    handleEdit,
    handleChangeCover,
    handleDelete,

    picselBookRef,

    showSortSheet,
  } = usePicselBook();

  const [showingSkeleton, setShowingSkeleton] = useState(false);
  const handleShowSkeletonChange = useCallback((show: boolean) => {
    setShowingSkeleton(show);
  }, []);

  if (!isLoading && !hasBooks) {
    return (
      <EmptyStateLayout
        floatingButton={
          <FloatingActionButtons
            isSelecting={false}
            showUpButton={false}
            showFunctionButtons={showFunctionButtons}
            onScrollToTop={scrollToTop}
            onToggleFunctionButtons={toggleFunctionButtons}
            onAlbumPress={handleAlbumPress}
            onQrPress={handleQrPress}
            onCloseFunctionButtons={closeFunctionButtons}
          />
        }>
        <View className="flex-1">
          <SparkleBackground />

          <View className="absolute left-[41px] top-16">
            <AddBookButton onPress={handleAddBook} />
          </View>

          <EmptyMessage
            message="네컷사진을 모아두는 나만의 앨범,픽셀북을 추가해보세요!"
            breakAtComma
          />
        </View>

        <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />
      </EmptyStateLayout>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <SparkleBackground />

      <PixelToolbar
        totalPhotos={totalBooks}
        isSelecting={isSelecting}
        selectedCount={selectedBookIds.length}
        disabled={showingSkeleton}
        onToggleSelecting={handleEnterSelecting}
        onSelectAll={handleSelectAll}
        onClose={handleExitSelecting}
        onSort={showSortSheet}
      />

      <PicselBookList
        books={books}
        isSelecting={isSelecting}
        selectedBookIds={selectedBookIds}
        isLoading={isLoading}
        onBookPress={handleBookPress}
        onEdit={handleEdit}
        onChangeCover={handleChangeCover}
        onDelete={handleDelete}
        onAddBook={isSelecting ? undefined : handleAddBook}
        onShowSkeletonChange={handleShowSkeletonChange}
      />

      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />

      {isSelecting && (
        <SelectionBottomSheet
          ref={selectionSheetRef}
          onDelete={handleDeletePress}
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
    </View>
  );
};

export default PicselBookTemplate;
