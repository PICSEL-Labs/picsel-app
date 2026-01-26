import React from 'react';

import { View } from 'react-native';

import { usePicselBook } from '../../../hooks/usePicselBook';
import AddBookButton from '../organisms/AddBookButton';
import PicselBookList from '../organisms/PicselBookList';

import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import AddButton from '@/feature/picsel/shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '@/feature/picsel/shared/components/ui/atoms/Button/FunctionButton';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import {
  PicselBookSortType,
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';

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
  } = usePicselBook();

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: PicselBookSortType) => {
    console.log('픽셀북 정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet<PicselBookSortType>({
    onSort: handleSort,
    options: PICSEL_BOOK_SORT_OPTIONS,
  });

  if (!isLoading && !hasBooks) {
    return (
      <EmptyStateLayout
        floatingButton={
          <View className="absolute bottom-1 right-1">
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
        }>
        <View className="flex-1">
          <View className="absolute left-9 top-16">
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
      <PixelToolbar
        totalPhotos={totalBooks}
        isSelecting={isSelecting}
        selectedCount={selectedBookIds.length}
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
      />

      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />

      {isSelecting && (
        <SelectionBottomSheet
          ref={selectionSheetRef}
          onDelete={handleDeletePress}
        />
      )}

      {!isSelecting && (
        <View className="absolute bottom-4 right-4">
          {showUpButton && (
            <View
              style={{
                marginBottom: showFunctionButtons ? 200 : 56,
              }}>
              <UpButton onPress={scrollToTop} />
            </View>
          )}
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
      )}
    </View>
  );
};

export default PicselBookTemplate;
