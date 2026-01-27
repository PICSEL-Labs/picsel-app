import React from 'react';

import { View } from 'react-native';

import EmptyStateLayout from '../../../../shared/components/layouts/EmptyStateLayout';
import AddButton from '../../../../shared/components/ui/atoms/Button/AddButton';
import FunctionButton from '../../../../shared/components/ui/atoms/Button/FunctionButton';
import EmptyMessage from '../../../../shared/components/ui/molecules/EmptyMessage';
import UploadTooltip from '../../../../shared/components/ui/molecules/UploadTooltip';
import SelectionBottomSheet from '../../../../shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import { useMyPicsel } from '../../../hooks/useMyPicsel';
import DateFilterButton from '../atoms/DateFilterButton';

import MonthFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/components/ui/organisms/YearFilterView';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/toolBar';
import { useSortActionSheet } from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';

const MyPicselTemplate = () => {
  const {
    photoData,
    yearGroups,
    isLoading,
    totalPhotos,
    hasPhotos,

    setSortType,

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

  const { showSortSheet } = useSortActionSheet({
    onSort: setSortType,
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

          <View className="absolute bottom-4 right-4">
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
