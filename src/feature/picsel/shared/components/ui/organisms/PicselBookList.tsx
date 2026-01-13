import React from 'react';

import { ScrollView, View } from 'react-native';

import PicselBookCard from '../molecules/PicselBookCard';

import { PicselBook } from '@/feature/picsel/picselBook/data/mockPicselBookData';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { cn } from '@/shared/lib/cn';

interface Props {
  books: PicselBook[];
  isSelecting?: boolean;
  selectedBookIds?: string[];
  onBookPress?: (bookId: string) => void;
  onAddBook: () => void;
}

const PicselBookList = ({
  books,
  isSelecting = false,
  selectedBookIds = [],
  onBookPress,
  onAddBook,
}: Props) => {
  return (
    <ScrollView className="flex-1 px-9 pt-2">
      <View className="flex-row flex-wrap justify-between">
        {/* 첫 번째 아이템: 추가하기 버튼 - 선택 모드 시 숨김 */}
        <View className={cn(isSelecting && 'opacity-40', 'mb-7 mr-[40px]')}>
          <AddBookButton onPress={onAddBook} />
        </View>

        {/* 픽셀북 카드들 */}
        {books.map((book, index) => {
          // 선택 모드가 아닐 때는 추가하기 버튼이 첫 번째이므로 index + 1로 계산
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
                onPress={onBookPress}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PicselBookList;
