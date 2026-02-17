import React from 'react';

import { View } from 'react-native';

import EmptyStateLayout from '../../../../shared/components/layouts/EmptyStateLayout';
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

    handleViewAllYear,
    handleViewMonthFolder,
  } = useMyPicsel();

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
          ref={flatListRef}
          onScroll={handleScroll}
          yearGroups={yearGroups}
          isLoading={isLoading}
          onViewMore={handleViewMonthFolder}
          onViewAllYear={handleViewAllYear}
        />
      ) : dateFilter === 'month' ? (
        <MonthFilterView
          ref={flatListRef}
          onScroll={handleScroll}
          yearGroups={yearGroups}
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
