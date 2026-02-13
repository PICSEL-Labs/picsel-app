import React, { useMemo } from 'react';

import { FlatList, View, useWindowDimensions } from 'react-native';

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

  const allItems = isLoading
    ? [
        { id: 'add-button', type: 'add' },
        ...Array.from({ length: skeletonCount }, (_, i) => ({
          id: `skeleton-${i}`,
          type: 'skeleton',
        })),
      ]
    : [
        { id: 'add-button', type: 'add' },
        ...books.map(book => ({
          ...book,
          id: book.picselbookId,
          type: 'book',
        })),
      ];

  return (
    <FlatList
      data={allItems}
      numColumns={NUM_COLUMNS}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: 8,
      }}
      columnWrapperStyle={{ gap: GAP }}
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

        if (item.type === 'skeleton') {
          return (
            <View className="mb-7">
              <PicselBookSkeleton />
            </View>
          );
        }

        const book = item as PicselBookItem & { type: string };

        console.log(book);

        return (
          <View className="mb-7">
            <PicselBookCard
              id={book.picselbookId}
              title={book.bookName}
              coverImage={getImageUrl(book.coverImagePath) || undefined}
              isSelecting={isSelecting}
              isSelected={selectedBookIds.includes(book.picselbookId)}
              onPress={onBookPress}
              onEdit={onEdit}
              onChangeCover={onChangeCover}
              onDelete={onDelete}
            />
          </View>
        );
      }}
    />
  );
};

export default PicselBookList;
