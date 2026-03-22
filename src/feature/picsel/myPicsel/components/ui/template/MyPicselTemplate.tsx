import React, { useCallback, useState } from 'react';

import { View } from 'react-native';

import EmptyStateLayout from '../../../../shared/components/layouts/EmptyStateLayout';
import SparkleBackground from '../../../../shared/components/ui/atoms/SparkleBackground';
import EmptyMessage from '../../../../shared/components/ui/molecules/EmptyMessage';
import UploadTooltip from '../../../../shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '../../../../shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import { useMyPicsel } from '../../../hooks/useMyPicsel';
import DateFilterButton from '../atoms/DateFilterButton';

import MonthFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/YearFilterView';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

const MyPicselTemplate = () => {
  const {
    photoData,
    yearGroups,
    isLoading,
    totalPhotos,
    hasPhotos,

    showSortSheet,

    isFilterActive,

    dateFilter,
    handleDateFilterChange,

    isSelecting,
    selectedPhotos,
    toggleSelection,
    selectAll,
    handleEnterSelecting,
    handleExitSelecting,
    selectionBottomSheetRef,

    showUpButton,
    flatListRef,
    handleScroll,
    scrollToTop,

    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    handleDelete,
    handleMove,

    handleEndReached,

    handleViewAllYear,
    handleViewMonthFolder,
  } = useMyPicsel();

  const [showingSkeleton, setShowingSkeleton] = useState(false);
  const handleShowSkeletonChange = useCallback((show: boolean) => {
    setShowingSkeleton(show);
  }, []);

  if (!isLoading && !hasPhotos) {
    return (
      <EmptyStateLayout
        floatingButton={
          <FloatingActionButtons
            isSelecting={false}
            showUpButton={false}
            showFunctionButtons={showFunctionButtons}
            onScrollToTop={scrollToTop}
            onToggleFunctionButtons={toggleFunctionButtons}
            onAlbumPress={handleAlbumPress}
            onQrPress={handleQrPress}
            onCloseFunctionButtons={closeFunctionButtons}
            tooltip={<UploadTooltip />}
          />
        }>
        <View className="flex-1">
          <SparkleBackground />
          <EmptyMessage message="당신의 네컷사진을 올려보세요!" />
        </View>
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
          disabled={showingSkeleton}
          isFilterActive={isFilterActive}
          onToggleSelecting={handleEnterSelecting}
          onSelectAll={() => selectAll(totalPhotos, photoData)}
          onClose={handleExitSelecting}
          onSort={showSortSheet}
          onFilter={() => showBrandFilterSheet('picsel')}
        />
      )}

      {isFilterActive && photoData.length === 0 && !isLoading ? (
        <View className="flex-1 pb-14">
          <SparkleBackground />
          <EmptyMessage message="선택한 브랜드의 사진이 없어요" />
        </View>
      ) : dateFilter === 'year' ? (
        <YearFilterView
          ref={flatListRef}
          onScroll={handleScroll}
          yearGroups={yearGroups}
          isLoading={isLoading}
          onViewMore={handleViewMonthFolder}
          onViewAllYear={handleViewAllYear}
          onShowSkeletonChange={handleShowSkeletonChange}
        />
      ) : dateFilter === 'month' ? (
        <MonthFilterView
          ref={flatListRef}
          onScroll={handleScroll}
          yearGroups={yearGroups}
          isLoading={isLoading}
          onViewMonthFolder={handleViewMonthFolder}
          onShowSkeletonChange={handleShowSkeletonChange}
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
          onEndReached={handleEndReached}
          onShowSkeletonChange={handleShowSkeletonChange}
        />
      )}

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {!isSelecting && (
        <>
          <View className="absolute bottom-4 left-0 right-0 items-center">
            <DateFilterButton
              selected={dateFilter}
              onSelect={handleDateFilterChange}
            />
          </View>

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
    </View>
  );
};

export default MyPicselTemplate;
