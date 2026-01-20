import React from 'react';

import { FlatList, View } from 'react-native';

import PicselBookCard from '../molecules/PicselBookCard';

import AddBookButton from './AddBookButton';

import { PicselBook } from '@/feature/picsel/picselBook/data/mockPicselBookData';
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
  const allItems = [
    { id: 'add-button', type: 'add' },
    ...books.map(book => ({ ...book, type: 'book' })),
  ];

  return (
    <FlatList
      data={allItems}
      numColumns={3}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item, index }) => {
        if (item.type === 'add') {
          return (
            <View
              className={cn(isSelecting && 'opacity-40', 'mb-7')}
              style={{ marginRight: 40 }}>
              <AddBookButton onPress={onAddBook} />
            </View>
          );
        }

        const book = item as PicselBook & { type: string };
        const isLastInRow = (index + 1) % 3 === 0;

        return (
          <View
            className="mb-7"
            style={{
              marginRight: isLastInRow ? 0 : 40,
            }}>
            <PicselBookCard
              id={book.id}
              title={book.title}
              coverImage={book.coverImage}
              isSelecting={isSelecting}
              isSelected={selectedBookIds.includes(book.id)}
              isLoading={isLoading}
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
