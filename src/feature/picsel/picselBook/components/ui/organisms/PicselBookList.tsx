import React, { useEffect, useMemo } from 'react';

import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';

import {
  CARD_WIDTH,
  GAP,
  NUM_COLUMNS,
} from '../../../constants/picselBookGrid';
import { ITEM_HEIGHT, TOP_OFFSET } from '../../../constants/styles';
import { PicselBookItem } from '../../../types';
import PicselBookCard from '../molecules/PicselBookCard';

import AddBookButton from './AddBookButton';

import PicselBookSkeleton from '@/feature/picsel/shared/components/ui/atoms/Skeleton/PicselBookSkeleton';
import { useImagePreload } from '@/shared/hooks/useImagePreload';
import { cn } from '@/shared/lib/cn';
import { getImageUrl } from '@/shared/utils/image';

interface Props {
  books: PicselBookItem[];
  isSelecting?: boolean;
  selectedBookIds?: string[];
  isLoading?: boolean;
  onBookPress?: (bookId: string, bookName: string) => void;
  onEdit?: (id: string, title: string) => void;
  onChangeCover?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onAddBook?: () => void;
  isUploadStep?: boolean;
  onImagesReady?: () => void;
}

const PicselBookList = ({
  books,
  isSelecting,
  selectedBookIds = [],
  isLoading = false,
  onBookPress,
  onEdit,
  onChangeCover,
  onDelete,
  onAddBook,
  isUploadStep = false,
  onImagesReady,
}: Props) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const horizontalPadding = useMemo(() => {
    const totalCardsWidth = CARD_WIDTH * NUM_COLUMNS;
    const totalGapsWidth = GAP * (NUM_COLUMNS - 1);
    const totalContentWidth = totalCardsWidth + totalGapsWidth;
    const remainingSpace = screenWidth - totalContentWidth;
    return remainingSpace / 2;
  }, [screenWidth]);

  const skeletonCount = useMemo(() => {
    const availableHeight = screenHeight - TOP_OFFSET;
    const rowCount = Math.ceil(availableHeight / ITEM_HEIGHT);
    const totalItems = rowCount * NUM_COLUMNS;
    return totalItems - 1; // AddButton 제외
  }, [screenHeight]);

  // 커버 이미지가 있는 책들의 URI 추출
  const coverImageUris = useMemo(
    () =>
      books
        .filter(book => book.coverImagePath)
        .map(book => getImageUrl(book.coverImagePath)),
    [books],
  );

  const { isImagesLoaded, handleImageLoad, handleImageError } =
    useImagePreload(coverImageUris);

  const showSkeleton = isLoading || (!isImagesLoaded && books.length > 0);

  useEffect(() => {
    if (!showSkeleton) {
      onImagesReady?.();
    }
  }, [showSkeleton]);

  const bookItems = useMemo(
    () => [
      { id: 'add-button', type: 'add' as const },
      ...books.map(book => ({
        ...book,
        id: book.picselbookId,
        type: 'book' as const,
      })),
    ],
    [books],
  );

  const skeletonItems = useMemo(
    () => [
      { id: 'add-button', type: 'add' as const },
      ...Array.from({ length: skeletonCount }, (_, i) => ({
        id: `skeleton-${i}`,
        type: 'skeleton' as const,
      })),
    ],
    [skeletonCount],
  );

  const contentContainerStyle = useMemo(
    () => ({
      paddingHorizontal: horizontalPadding,
      paddingTop: 8,
    }),
    [horizontalPadding],
  );

  const columnWrapperStyle = useMemo(() => ({ gap: GAP }), []);

  return (
    <View style={styles.container}>
      {/* 실제 리스트 - 스켈레톤 중에는 숨김 (이미지 다운로드는 진행) */}
      {books.length > 0 && (
        <FlatList
          data={bookItems}
          numColumns={NUM_COLUMNS}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{ opacity: showSkeleton ? 0 : 1 }}
          contentContainerStyle={contentContainerStyle}
          columnWrapperStyle={columnWrapperStyle}
          renderItem={({ item }) => {
            if (item.type === 'add') {
              return (
                <View
                  className={cn(
                    !isUploadStep && isSelecting && 'opacity-40',
                    'mb-7',
                  )}>
                  <AddBookButton onPress={onAddBook} />
                </View>
              );
            }

            const book = item as PicselBookItem & { type: string };
            const coverUri = getImageUrl(book.coverImagePath) || undefined;

            return (
              <View className="mb-7">
                <PicselBookCard
                  id={book.picselbookId}
                  title={book.bookName}
                  coverImage={coverUri}
                  isSelecting={isSelecting}
                  isSelected={selectedBookIds.includes(book.picselbookId)}
                  onPress={onBookPress}
                  onEdit={onEdit}
                  onChangeCover={onChangeCover}
                  onDelete={onDelete}
                  onImageLoad={
                    coverUri ? () => handleImageLoad(coverUri) : undefined
                  }
                  onImageError={
                    coverUri ? () => handleImageError(coverUri) : undefined
                  }
                />
              </View>
            );
          }}
        />
      )}

      {/* 스켈레톤 오버레이 */}
      {showSkeleton && (
        <View style={StyleSheet.absoluteFill}>
          <FlatList
            data={skeletonItems}
            numColumns={NUM_COLUMNS}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={contentContainerStyle}
            columnWrapperStyle={columnWrapperStyle}
            renderItem={({ item }) => {
              if (item.type === 'add') {
                return (
                  <View
                    className={cn(
                      !isUploadStep && isSelecting && 'opacity-40',
                      'mb-7',
                    )}>
                    <AddBookButton onPress={onAddBook} />
                  </View>
                );
              }

              return (
                <View className="mb-7">
                  <PicselBookSkeleton />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PicselBookList;
