import React, { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecules/EmptyMessage';
import PicselBookBottomSheet from '../../organisms/bottomSheet/PicselBookBottomSheet';
import PicselBookList from '../../organisms/PicselBookList';
import PixelToolbar from '../../organisms/PixelToolbar';

import AddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { MOCK_PICSEL_BOOK_DATA } from '@/feature/picsel/shared/data/mockPicselBookData';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/usePhotoSelection';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';
import {
  PicselBookSortType,
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import { useToastStore } from '@/shared/store/ui/toast';

const PicselBookTemplate = () => {
  const { handleAddPicsel } = usePicselBookActions();
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // 픽셀북 데이터
  const [books, setBooks] = useState(MOCK_PICSEL_BOOK_DATA);
  const totalBooks = books.length;
  const hasBooks = totalBooks > 0;

  // 선택 관련 훅
  const {
    isSelecting,
    selectedPhotos,
    setIsSelecting,
    selectAll,
    resetSelection,
  } = usePhotoSelection();

  // 정렬 핸들러
  const handleSort = (sortType: PicselBookSortType) => {
    console.log('픽셀북 정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
  };

  // 정렬 액션시트 - 픽셀북 정렬 옵션 사용
  const { showSortSheet } = useSortActionSheet<PicselBookSortType>({
    onSort: handleSort,
    options: PICSEL_BOOK_SORT_OPTIONS,
  });

  const handleAddBook = () => {
    picselBookRef.current?.present();
  };

  const handleSubmit = (bookName: string) => {
    // TODO: 픽셀북 생성 API 호출
    console.log('픽셀북 생성:', bookName);
    showToast(`"${bookName}" 픽셀북이 생성되었어요`, 60);

    // 임시로 새 픽셀북 추가
    const newBook = {
      id: String(books.length + 1),
      title: bookName,
      photoCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBooks([newBook, ...books]);
  };

  const handleBookPress = (bookId: string) => {
    console.log('픽셀북 클릭:', bookId);
    // TODO: 픽셀북 상세 화면으로 이동
  };

  // Empty 상태 체크
  if (!hasBooks) {
    return (
      <EmptyStateLayout
        floatingButton={<AddButton onPress={handleAddPicsel} />}>
        <View className="flex-1">
          <View className="absolute left-9 top-16">
            {/* 추가하기 버튼만 표시 */}
            <AddBookButton onPress={handleAddBook} />
          </View>

          {/* Empty 메시지 */}
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
      {/* 툴바 - 브랜드 필터 없이 */}
      <PixelToolbar
        totalPhotos={totalBooks}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        onToggleSelecting={() => setIsSelecting(!isSelecting)}
        onSelectAll={() => selectAll(totalBooks, books)}
        onClose={resetSelection}
        onSort={showSortSheet}
      />

      {/* 픽셀북 리스트 (AddBookButton 포함) */}
      <PicselBookList
        books={books}
        onBookPress={handleBookPress}
        onAddBook={handleAddBook}
      />

      {/* 픽셀북 생성 바텀시트 */}
      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />

      {/* 플로팅 버튼 */}
      <View className="absolute -bottom-4 right-4">
        <AddButton onPress={handleAddPicsel} />
      </View>
    </View>
  );
};

export default PicselBookTemplate;
