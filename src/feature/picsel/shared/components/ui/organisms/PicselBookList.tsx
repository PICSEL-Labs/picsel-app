import React from 'react';

import { ScrollView, View } from 'react-native';

import PicselBookCard from '../molecules/PicselBookCard';

import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { PicselBook } from '@/feature/picsel/shared/data/mockPicselBookData';

interface Props {
  books: PicselBook[];
  onBookPress?: (bookId: string) => void;
  onAddBook: () => void;
}

const PicselBookList = ({ books, onBookPress, onAddBook }: Props) => {
  return (
    <ScrollView className="flex-1 px-9 pt-2">
      <View className="flex-row flex-wrap justify-between">
        {/* 첫 번째 아이템: 추가하기 버튼 */}
        <View className="mb-7" style={{ marginRight: 40 }}>
          <AddBookButton onPress={onAddBook} />
        </View>

        {/* 픽셀북 카드 List */}
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
