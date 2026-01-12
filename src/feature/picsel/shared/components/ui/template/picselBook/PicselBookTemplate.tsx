import React, { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecules/EmptyMessage';
import PicselBookBottomSheet from '../../organisms/bottomSheet/PicselBookBottomSheet';
import PixelToolbar from '../../organisms/PixelToolbar';

import AddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/usePhotoSelection';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';
import {
  PicselBookSortType,
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import PicselBookIcons from '@/shared/icons/PicselBookIcons';
import { useToastStore } from '@/shared/store/ui/toast';

const PicselBookTemplate = () => {
  const { handleAddPicsel } = usePicselBookActions();
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // TODO: 실제 픽셀북 데이터로 교체
  const [photoData] = useState([]);
  const totalPhotos = photoData.length;

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
  };

  return (
    <EmptyStateLayout floatingButton={<AddButton onPress={handleAddPicsel} />}>
      <View className="flex-1">
        {/* 툴바 - 브랜드 필터 없이 */}
        <PixelToolbar
          totalPhotos={totalPhotos}
          isSelecting={isSelecting}
          selectedCount={selectedPhotos.length}
          onToggleSelecting={() => setIsSelecting(!isSelecting)}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={resetSelection}
          onSort={showSortSheet}
        />

        <AddBookButton onPress={handleAddBook} />

        <PicselBookIcons shape="default" width={80} height={72} />
        <PicselBookIcons shape="default" width={80} height={72} />
        <PicselBookIcons shape="default" width={80} height={72} />
        <PicselBookIcons shape="default" width={80} height={72} />

        <EmptyMessage
          message="네컷사진을 모아두는 나만의 앨범,픽셀북을 추가해보세요!"
          breakAtComma
        />
      </View>

      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />
    </EmptyStateLayout>
  );
};

export default PicselBookTemplate;
