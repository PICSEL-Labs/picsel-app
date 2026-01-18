import React from 'react';

import { ScrollView, View } from 'react-native';

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
  return (
    <ScrollView
      className="flex-1 px-10 pt-2"
      showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap">
        <View className={cn(isSelecting && 'opacity-40', 'mb-7 mr-[40px]')}>
          <AddBookButton onPress={onAddBook} />
        </View>

        {/* 픽셀북 카드들 */}
        {books.map((book, index) => {
          const position = index + 1;
          return (
            <View
              key={book.id}
              className="mb-7"
              style={{
                marginRight: (position + 1) % 3 === 0 ? 0 : 40,
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
        })}
      </View>
    </ScrollView>
  );
};

export default PicselBookList;
