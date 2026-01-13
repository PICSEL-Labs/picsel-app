import React, { useEffect, useState } from 'react';

import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/ui/organisms/MOCK_YEAR_DATA';
import PhotoListView from '@/feature/picsel/myPicsel/ui/organisms/PhotoListView';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/FloatingActionButtons';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/usePhotoSelection';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/useScrollWithUpButton';
import { useSelectionBottomSheet } from '@/feature/picsel/shared/hooks/useSelectionBottomSheet';
import {
  SortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  onBack: () => void;
}

const YearFolderTemplate = ({ year, onBack }: Props) => {
  const [photoData, setPhotoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalPhotos = photoData.length;

  const {
    isSelecting,
    selectedPhotos,
    setIsSelecting,
    toggleSelection,
    selectAll,
    resetSelection,
  } = usePhotoSelection();

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

  const { selectionBottomSheetRef } = useSelectionBottomSheet(isSelecting);

  // 데이터 로딩 및 년도별 필터링
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // 해당 년도의 모든 사진 가져오기
      const yearData = MOCK_YEAR_DATA.find(data => data.year === year);
      if (yearData) {
        const allPhotos = yearData.months.flatMap(month => month.photos);
        setPhotoData(allPhotos);
      } else {
        setPhotoData([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [year]);

  const handleSort = (sortType: SortType) => {
    console.log('정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  return (
    <ScreenLayout>
      {/* 헤더 */}
      <FolderHeader title={`${year}년`} onBack={onBack} />

      {/* 툴바 */}
      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        onToggleSelecting={() => setIsSelecting(!isSelecting)}
        onSelectAll={() => selectAll(totalPhotos, photoData)}
        onClose={resetSelection}
        onSort={showSortSheet}
        onFilter={showBrandFilterSheet}
      />

      {/* 콘텐츠 */}
      <PhotoListView
        ref={flatListRef}
        data={photoData}
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        onToggleSelection={toggleSelection}
        isLoading={isLoading}
        onScroll={handleScroll}
      />

      {/* Selection Bottom Sheet */}
      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {/* Floating Buttons */}
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
    </ScreenLayout>
  );
};

export default YearFolderTemplate;
