import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import FloatingAddButton from '../../atoms/AddButton';
import DateFilterButton, { DateFilterType } from '../../atoms/DateFilterButton';
import FunctionButton from '../../atoms/FunctionButton';
import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecules/EmptyMessage';
import UploadTooltip from '../../molecules/UploadTooltip';
import SelectionBottomSheet from '../../organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '../../organisms/PixelToolbar';

import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/ui/organisms/MOCK_YEAR_DATA';
import MonthFilterView from '@/feature/picsel/myPicsel/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/ui/organisms/YearFilterView';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/UpButton';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/usePhotoSelection';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/useScrollWithUpButton';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const MyPicselTemplate = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { handleAddPicsel } = usePicselBookActions();
  const selectionBottomSheetRef = useRef<BottomSheetModal>(null);

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

  // 선택 모드 변경 시 바텀시트 제어
  useEffect(() => {
    if (isSelecting) {
      selectionBottomSheetRef.current?.present();
    } else {
      selectionBottomSheetRef.current?.dismiss();
    }
  }, [isSelecting]);

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
    // TODO: 정렬 로직 구현
    switch (sortType) {
      case 'latest':
        break;
      case 'date':
        break;
    }
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  const handleDateFilterChange = (type: DateFilterType) => {
    setDateFilter(type);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          onToggleSelecting={() => setIsSelecting(!isSelecting)}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={resetSelection}
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
              <FloatingAddButton onPress={toggleFunctionButtons} />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default MyPicselTemplate;
