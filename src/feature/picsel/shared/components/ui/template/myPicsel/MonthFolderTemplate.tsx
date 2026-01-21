import React, { useEffect, useState } from 'react';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/data/MOCK_YEAR_DATA';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

interface Props {
  year: string;
  month: string;
  onBack: () => void;
}

const MonthFolderTemplate = ({ year, month, onBack }: Props) => {
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
    exitSelectingMode: handleExitSelecting,
  });

  // 데이터 로딩 및 월별 필터링
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // 해당 년도와 월의 모든 사진 가져오기
      const yearData = MOCK_YEAR_DATA.find(data => data.year === year);
      if (yearData) {
        const monthData = yearData.months.find(m => m.month === month);
        if (monthData) {
          setPhotoData(monthData.photos);
        } else {
          setPhotoData([]);
        }
      } else {
        setPhotoData([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [year, month]);

  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  return (
    <ScreenLayout>
      {/* 헤더 */}
      <FolderHeader title={`${year}년 ${month}`} onBack={onBack} />

      {/* 툴바 */}
      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        onToggleSelecting={handleEnterSelecting}
        onSelectAll={() => selectAll(totalPhotos, photoData)}
        onClose={handleExitSelecting}
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
        showYear={false}
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

export default MonthFolderTemplate;
