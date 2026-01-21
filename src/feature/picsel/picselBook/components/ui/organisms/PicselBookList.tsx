import React, { useMemo } from 'react';

import { FlatList, View, useWindowDimensions } from 'react-native';

import {
  CARD_WIDTH,
  GAP,
  NUM_COLUMNS,
} from '../../../constants/picselBookGrid';
import PicselBookCard from '../molecules/PicselBookCard';

import AddBookButton from './AddBookButton';

import { PicselBook } from '@/feature/picsel/picselBook/data/mockPicselBookData';
import PicselBookSkeleton from '@/feature/picsel/shared/components/ui/atoms/Skeleton/PicselBookSkeleton';
import { cn } from '@/shared/lib/cn';

interface Props {
  books: PicselBook[];
  isSelecting?: boolean;
  selectedBookIds?: string[];
  isLoading?: boolean;
  onBookPress?: (bookId: string) => void;
  onEdit?: (id: string, title: string) => void;
  onChangeCover?: (id: string) => void;
  onDelete?: (id: string, title: string) => void;
  onAddBook: () => void;
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
}: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  const horizontalPadding = useMemo(() => {
    const totalCardsWidth = CARD_WIDTH * NUM_COLUMNS;
    const totalGapsWidth = GAP * (NUM_COLUMNS - 1);
    const totalContentWidth = totalCardsWidth + totalGapsWidth;
    const remainingSpace = screenWidth - totalContentWidth;
    return remainingSpace / 2;
  }, [screenWidth]);

  const allItems = isLoading
    ? [
        { id: 'add-button', type: 'add' },
        ...Array.from({ length: 5 }, (_, i) => ({
          id: `skeleton-${i}`,
          type: 'skeleton',
        })),
      ]
    : [
        { id: 'add-button', type: 'add' },
        ...books.map(book => ({ ...book, type: 'book' })),
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
            <View className={cn(isSelecting && 'opacity-40', 'mb-7')}>
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

        const book = item as PicselBook & { type: string };

        return (
          <View className="mb-7">
            <PicselBookCard
              id={book.id}
              title={book.title}
              coverImage={book.coverImage}
              isSelecting={isSelecting}
              isSelected={selectedBookIds.includes(book.id)}
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
