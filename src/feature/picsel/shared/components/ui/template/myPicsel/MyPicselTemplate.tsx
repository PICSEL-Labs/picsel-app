import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import FloatingAddButton from '../../atoms/AddButton';
import DateFilterButton, { DateFilterType } from '../../atoms/DateFilterButton';
import FunctionButton from '../../atoms/FunctionButton';
import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';
import UploadTooltip from '../../molecule/UploadTooltip';
import SelectionBottomSheet from '../../organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '../../organisms/PixelToolbar';

import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/ui/organisms/MOCK_YEAR_DATA';
import MonthFilterView from '@/feature/picsel/myPicsel/ui/organisms/MonthFilterView';
import PhotoListView from '@/feature/picsel/myPicsel/ui/organisms/PhotoListView';
import YearFilterView from '@/feature/picsel/myPicsel/ui/organisms/YearFilterView';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/UpButton';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';
import {
  SortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const MyPicselTemplate = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { handleAddPicsel } = usePicselBookActions();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [showUpButton, setShowUpButton] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [showFunctionButtons, setShowFunctionButtons] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const selectionBottomSheetRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 -> 이후 query로 교체

  const totalPhotos = photoData.length;
  const hasPhotos = totalPhotos > 0;

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

  const handleScrollToTop = () => {
    setShowUpButton(false);
    if (dateFilter === 'year') {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowUpButton(offsetY > 100);
  };

  const handleToggleSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === totalPhotos) {
      // 전체 선택 상태면 전체 해제
      setSelectedPhotos([]);
    } else {
      // 전체 선택
      const allPhotoIds = photoData.map(photo => photo.id);
      setSelectedPhotos(allPhotoIds);
    }
  };

  const handleDelete = () => {
    if (selectedPhotos.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal(selectedPhotos.length, handleConfirmDelete);
  };

  const handleConfirmDelete = () => {
    // TODO: 실제 삭제 로직
    showToast(`${selectedPhotos.length}장의 사진을 삭제했어요`, 60);
    setSelectedPhotos([]);
    setIsSelecting(false);
  };

  const handleMove = () => {
    // 다른 픽셀북 화면으로 이동
  };

  const handleSort = (sortType: SortType) => {
    console.log('정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
    switch (sortType) {
      case 'latest':
        // 최근 생성 순 정렬
        break;
      case 'name':
        // 이름 순 정렬
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
      setShowUpButton(false);
    }, 10);

    setTimeout(() => {
      setIsLoading(false);
      setShowUpButton(false);
    }, 1000);

    // TODO: 날짜 필터링 로직 구현
  };

  const handleViewAllYear = (year: string) => {
    navigation.navigate('YearFolder', { year });
  };

  const handleViewMonthFolder = (year: string, month: string) => {
    navigation.navigate('MonthFolder', { year, month });
  };

  const handleToggleFunctionButtons = () => {
    setShowFunctionButtons(!showFunctionButtons);
  };

  const handleAlbumPress = () => {
    setShowFunctionButtons(false);
    navigation.navigate('PhotoUpload');
  };

  const handleQrPress = () => {
    setShowFunctionButtons(false);
    navigation.navigate('QrScan');
  };

  const handleCloseFunctionButtons = () => {
    setShowFunctionButtons(false);
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
          onSelectAll={handleSelectAll}
          onClose={() => {
            setIsSelecting(false);
            setSelectedPhotos([]);
          }}
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
          onToggleSelection={handleToggleSelection}
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
                <UpButton onPress={handleScrollToTop} />
              </View>
            )}
            {showFunctionButtons ? (
              <FunctionButton
                onAlbumPress={handleAlbumPress}
                onQrPress={handleQrPress}
                onClose={handleCloseFunctionButtons}
              />
            ) : (
              <FloatingAddButton onPress={handleToggleFunctionButtons} />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default MyPicselTemplate;
