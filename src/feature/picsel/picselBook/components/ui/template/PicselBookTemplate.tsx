import React, { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import { MOCK_PICSEL_BOOK_DATA } from '@/feature/picsel/picselBook/data/mockPicselBookData';
import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import AddButton from '@/feature/picsel/shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '@/feature/picsel/shared/components/ui/atoms/Button/FunctionButton';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PicselBookList from '@/feature/picsel/shared/components/ui/organisms/PicselBookList';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import {
  PicselBookSortType,
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

const PicselBookTemplate = () => {
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // 픽셀북 데이터
  const [books, setBooks] = useState(MOCK_PICSEL_BOOK_DATA);
  const totalBooks = books.length;
  const hasBooks = totalBooks > 0;

  // 선택 관련 훅
  const { isSelecting, setIsSelecting, resetSelection } = usePhotoSelection();

  // 선택된 픽셀북 ID 관리
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  // 선택 모드 전환 훅
  const { handleEnterSelecting, handleExitSelecting, selectionSheetRef } =
    useSelectingMode({
      isSelecting,
      setIsSelecting,
      resetSelection: () => {
        setSelectedBookIds([]);
        resetSelection();
      },
    });

  const {
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,
  } = useFunctionButtons();

  const { showUpButton, scrollToTop } = useScrollWithUpButton();

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
    if (isSelecting) {
      // 선택 모드: 토글
      setSelectedBookIds(prev =>
        prev.includes(bookId)
          ? prev.filter(id => id !== bookId)
          : [...prev, bookId],
      );
    } else {
      // 일반 모드: 상세 화면 이동
      console.log('픽셀북 클릭:', bookId);
      // TODO: 픽셀북 상세 화면으로 이동
    }
  };

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedBookIds.length === totalBooks) {
      setSelectedBookIds([]);
    } else {
      setSelectedBookIds(books.map(book => book.id));
    }
  };

  // 삭제 버튼 클릭
  const handleDeletePress = () => {
    if (selectedBookIds.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    selectionSheetRef.current?.dismiss();

    // ConfirmModal 사용
    showDeleteConfirmModal('picselBook', selectedBookIds.length, () => {
      // TODO: 픽셀북 삭제 API 호출
      const deletedCount = selectedBookIds.length;
      setBooks(prev => prev.filter(book => !selectedBookIds.includes(book.id)));
      handleExitSelecting();
      showToast(`${deletedCount}개의 픽셀북을 삭제했어요`, 60);
    });
  };

  // Empty 상태 체크
  if (!hasBooks) {
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
        selectedCount={selectedBookIds.length}
        onToggleSelecting={handleEnterSelecting}
        onSelectAll={handleSelectAll}
        onClose={handleExitSelecting}
        onSort={showSortSheet}
      />

      {/* 픽셀북 리스트 (AddBookButton 포함) */}
      <PicselBookList
        books={books}
        isSelecting={isSelecting}
        selectedBookIds={selectedBookIds}
        onBookPress={handleBookPress}
        onAddBook={handleAddBook}
      />

      {/* 픽셀북 생성 바텀시트 */}
      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />

      {/* 픽셀북 선택 바텀시트 - onMove 없이 호출하여 픽셀북 모드로 사용 */}
      {isSelecting && (
        <SelectionBottomSheet
          ref={selectionSheetRef}
          onDelete={handleDeletePress}
        />
      )}

      {/* 플로팅 버튼 - 선택 모드가 아닐 때만 표시 */}
      {/* Add Button - Right */}
      <View className="absolute -bottom-4 right-4">
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
    </View>
  );
};

export default PicselBookTemplate;
