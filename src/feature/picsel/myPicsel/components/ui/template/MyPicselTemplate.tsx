import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import EmptyStateLayout from '../../../../shared/components/layouts/EmptyStateLayout';
import FloatingAddButton from '../../../../shared/components/ui/atoms/Button/AddButton';
import AddButton from '../../../../shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '../../../../shared/components/ui/atoms/Button/FunctionButton';
import EmptyMessage from '../../../../shared/components/ui/molecules/EmptyMessage';
import UploadTooltip from '../../../../shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '../../../../shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '../../../../shared/components/ui/organisms/PixelToolbar';
import DateFilterButton, { DateFilterType } from '../atoms/DateFilterButton';

import MonthFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/YearFilterView';
import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/data/MOCK_YEAR_DATA';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/navigation/usePicselBookActions';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const MyPicselTemplate = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { handleAddPicsel } = usePicselBookActions();

  const [photoData, setPhotoData] = useState([]);
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  const totalPhotos = photoData.length;
  const hasPhotos = totalPhotos > 0;

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

  const {
    showUpButton,
    flatListRef,
    scrollViewRef,
    handleScroll,
    scrollToTop,
  } = useScrollWithUpButton({
    useScrollView: dateFilter === 'year' || dateFilter === 'month',
  });

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

  // 시뮬레이션: 데이터 로딩 (실제로는 API 호출)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // MOCK_YEAR_DATA에서 모든 사진 가져오기
      const allPhotos = MOCK_YEAR_DATA.flatMap(yearData =>
        yearData.months.flatMap(month => month.photos),
      );
      setPhotoData(allPhotos);
    }, 2000); // 2초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
    switch (sortType) {
      case 'latest':
        // 최근 생성 순 정렬
        break;

      case 'date':
        // 사진 게재 순 정렬
        break;
    }
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  const handleDateFilterChange = (type: DateFilterType) => {
    setDateFilter(type);
    console.log('날짜 필터:', type);

    // 필터 변경 시 로딩 상태 시뮬레이션
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // TODO: 날짜 필터링 로직 구현
  };

  const handleViewAllYear = (year: string) => {
    navigation.navigate('YearFolder', { year });
  };

  const handleViewMonthFolder = (year: string, month: string) => {
    navigation.navigate('MonthFolder', { year, month });
  };

  // Empty state (로딩 중이 아닐 때만 표시)
  if (!isLoading && !hasPhotos) {
    return (
      <EmptyStateLayout
        floatingButton={
          <>
            <UploadTooltip />
            <FloatingAddButton onPress={handleAddPicsel} />
          </>
        }>
        <EmptyMessage message="당신의 네컷사진을 올려보세요!" />
      </EmptyStateLayout>
    );
  }

  // Content state (로딩 중이거나 사진이 있을 때)
  return (
    <View className="flex-1">
      {/* 툴바 (년/월 필터가 아닐 때만 표시) */}
      {dateFilter === 'all' && (
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
      )}

      {/* 콘텐츠 */}
      {dateFilter === 'year' ? (
        <YearFilterView
          scrollViewRef={scrollViewRef}
          onScroll={handleScroll}
          yearGroups={MOCK_YEAR_DATA}
          isLoading={isLoading}
          onViewMore={handleViewMonthFolder}
          onViewAllYear={handleViewAllYear}
        />
      ) : dateFilter === 'month' ? (
        <MonthFilterView
          scrollViewRef={scrollViewRef}
          onScroll={handleScroll}
          yearGroups={MOCK_YEAR_DATA}
          isLoading={isLoading}
          onViewMonthFolder={handleViewMonthFolder}
        />
      ) : (
        <PhotoListView
          ref={flatListRef}
          data={photoData}
          isSelecting={isSelecting}
          selectedPhotos={selectedPhotos}
          onToggleSelection={toggleSelection}
          isLoading={isLoading}
          onScroll={handleScroll}
        />
      )}

      {/* Selection Bottom Sheet */}
      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {/* Floating Buttons - 항상 하단 고정 */}
      {!isSelecting && (
        <>
          {/* Date Filter - Center */}
          <View className="absolute -bottom-4 left-0 right-0 items-center">
            <DateFilterButton
              selected={dateFilter}
              onSelect={handleDateFilterChange}
            />
          </View>

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
        </>
      )}
    </View>
  );
};

export default MyPicselTemplate;
