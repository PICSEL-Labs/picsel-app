import React from 'react';

import { View } from 'react-native';

import EmptyStateLayout from '../../../../shared/components/layouts/EmptyStateLayout';
import AddButton from '../../../../shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '../../../../shared/components/ui/atoms/Button/FunctionButton';
import EmptyMessage from '../../../../shared/components/ui/molecules/EmptyMessage';
import UploadTooltip from '../../../../shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '../../../../shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '../../../../shared/components/ui/organisms/PixelToolbar';
import { useMyPicsel } from '../../../hooks/useMyPicsel';
import DateFilterButton from '../atoms/DateFilterButton';

import MonthFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/YearFilterView';
import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/data/MOCK_YEAR_DATA';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';
import {
  MyPicselSortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

const MyPicselTemplate = () => {
  const {
    // 데이터
    photoData,
    isLoading,
    totalPhotos,
    hasPhotos,

    // 날짜 필터
    dateFilter,
    handleDateFilterChange,

    // 선택 모드
    isSelecting,
    selectedPhotos,
    toggleSelection,
    selectAll,
    handleEnterSelecting,
    handleExitSelecting,
    selectionBottomSheetRef,

    // 스크롤
    showUpButton,
    flatListRef,
    scrollViewRef,
    handleScroll,
    scrollToTop,

    // 기능 버튼
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    // 사진 액션
    handleDelete,
    handleMove,

    // 네비게이션
    handleViewAllYear,
    handleViewMonthFolder,
  } = useMyPicsel();

  // TODO: 정렬 로직 구현
  const handleSort = (sortType: MyPicselSortType) => {
    console.log('정렬 타입:', sortType);
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  if (!isLoading && !hasPhotos) {
    return (
      <EmptyStateLayout
        floatingButton={
          <>
            <UploadTooltip />
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
          </>
        }>
        <EmptyMessage message="당신의 네컷사진을 올려보세요!" />
      </EmptyStateLayout>
    );
  }

  return (
    <View className="flex-1">
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

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {!isSelecting && (
        <>
          <View className="absolute -bottom-4 left-0 right-0 items-center">
            <DateFilterButton
              selected={dateFilter}
              onSelect={handleDateFilterChange}
            />
          </View>

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
