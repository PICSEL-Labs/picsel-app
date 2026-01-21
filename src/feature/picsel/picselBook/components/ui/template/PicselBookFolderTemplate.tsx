import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { MOCK_PICSEL_BOOK_PHOTO_DATA } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';
import EmptyStateLayout from '@/feature/picsel/shared/components/layouts/EmptyStateLayout';
import AddButton from '@/feature/picsel/shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '@/feature/picsel/shared/components/ui/atoms/Button/FunctionButton';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import EmptyMessage from '@/feature/picsel/shared/components/ui/molecules/EmptyMessage';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import UploadTooltip from '@/feature/picsel/shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { useSortActionSheet } from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  bookId: string;
  onBack: () => void;
}

type PicselBookSortType = 'latest' | 'oldest';
type PicselBookEditType = 'editName' | 'editCover';
type ViewMode = 'list' | 'textList';

const PicselBookFolderTemplate = ({ bookId, onBack }: Props) => {
  const initialBookData = MOCK_PICSEL_BOOK_PHOTO_DATA.find(
    data => data.bookId === bookId,
  );

  const [photoData, setPhotoData] = useState(initialBookData?.photos || []);
  const [bookTitle, setBookTitle] = useState(initialBookData?.bookTitle || '');
  // 초기 데이터가 비어있으면 로딩 상태를 false로 설정
  const [isLoading, setIsLoading] = useState(
    initialBookData?.photos.length ? true : false,
  );
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const totalPhotos = photoData.length;

  const {
    isSelecting,
    selectedPhotos,
    setIsSelecting,
    toggleSelection,
    selectAll,
    resetSelection,
  } = usePhotoSelection();

  const {
    handleEnterSelecting,
    handleExitSelecting,
    selectionSheetRef: selectionBottomSheetRef,
  } = useSelectingMode({
    isSelecting,
    setIsSelecting,
    resetSelection,
  });

  const { showUpButton, flatListRef, handleScroll, scrollToTop } =
    useScrollWithUpButton();

  const {
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,
  } = useFunctionButtons();

  const { handleDelete, handleMove } = usePhotoActions({
    selectedPhotos,
    onDeleteSuccess: resetSelection,
  });

  // TODO: 데이터 로딩 및 필터링
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      const bookData = MOCK_PICSEL_BOOK_PHOTO_DATA.find(
        data => data.bookId === bookId,
      );
      if (bookData) {
        setBookTitle(bookData.bookTitle);
        setPhotoData(bookData.photos);
      } else {
        setBookTitle('');
        setPhotoData([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [bookId]);

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: PicselBookSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  // TODO: 편집 로직 구현
  const handleEdit = (editType: PicselBookEditType) => {
    console.log('편집 타입:', editType);
  };

  const { showSortSheet: showEditSheet } = useSortActionSheet({
    onSort: handleEdit,
    options: [
      { type: 'editName', label: '이름 편집' },
      { type: 'editCover', label: '커버사진 편집' },
    ],
  });

  const formatPhotoCount = (count: number) => {
    if (count === 0) {
      return '0';
    }
    if (count > 999) {
      return '999+';
    }
    return count.toString();
  };

  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'list' ? 'textList' : 'list'));
  };

  return (
    <ScreenLayout>
      <FolderHeader
        title={`${bookTitle}(${formatPhotoCount(totalPhotos)})`}
        onBack={onBack}
        showToggle={true}
        onTogglePress={showEditSheet}
      />

      {photoData.length !== 0 && (
        <PixelToolbar
          listViewMode={viewMode}
          totalPhotos={totalPhotos}
          selectedCount={selectedPhotos.length}
          isSelecting={isSelecting}
          onToggleSelecting={handleEnterSelecting}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={handleExitSelecting}
          onFilter={showBrandFilterSheet}
          onSort={showSortSheet}
          onToggleViewMode={handleToggleViewMode}
        />
      )}

      {photoData.length === 0 && !isLoading ? (
        <EmptyStateLayout
          floatingButton={
            <>
              {!showFunctionButtons && <UploadTooltip bottom={120} />}
              <View className="absolute bottom-14 right-1">
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
            </>
          }>
          <EmptyMessage message="픽셀북이 비어있어요" />
        </EmptyStateLayout>
      ) : (
        <>
          <PhotoListView
            showYear={false}
            ref={flatListRef}
            data={photoData}
            selectedPhotos={selectedPhotos}
            isSelecting={isSelecting}
            isLoading={isLoading}
            onScroll={handleScroll}
            onToggleSelection={toggleSelection}
          />
          <FloatingActionButtons
            isSelecting={isSelecting}
            showUpButton={showUpButton}
            showFunctionButtons={showFunctionButtons}
            onScrollToTop={scrollToTop}
            onToggleFunctionButtons={toggleFunctionButtons}
            onAlbumPress={handleAlbumPress}
            onQrPress={handleQrPress}
            onCloseFunctionButtons={closeFunctionButtons}
          />
        </>
      )}

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </ScreenLayout>
  );
};

export default PicselBookFolderTemplate;
