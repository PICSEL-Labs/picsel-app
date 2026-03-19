import { useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useSortActionSheet } from '../../shared/hooks/animation/useSortActionSheet';
import { Photo } from '../components/ui/organisms/PhotoListView';
import { useGetMyPicsels } from '../queries/useGetMyPicsels';
import { DateFilterType, YearGroup } from '../types';
import { groupByYearMonth } from '../utils/groupByDate';

import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useImagePrefetch } from '@/shared/hooks/useImagePrefetch';
import { useMyPicselStore } from '@/shared/store';
import { useFilteredBrandsStore } from '@/shared/store/brand/filterBrands';
import { getImageUrl } from '@/shared/utils/image';

/**
 * MyPicsel 템플릿을 위한 통합 hook
 * - 사진 데이터 로딩
 * - 날짜 필터 관리
 * - 선택 모드
 * - 스크롤 관리
 * - 사진 액션 (삭제, 이동)
 * - 기능 버튼 (업로드)
 */
export const useMyPicsel = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // 날짜 필터 상태
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');

  // 정렬 상태 (전역 store)
  const { sortType, setSortType } = useMyPicselStore();

  // 브랜드 필터 상태
  const { filteredListBySource } = useFilteredBrandsStore();
  const picselFilteredList = filteredListBySource.picsel;
  const brandIds = useMemo(
    () => picselFilteredList.map(b => b.brandId),
    [picselFilteredList],
  );
  const isFilterActive = picselFilteredList.length > 0;

  // 내 픽셀 데이터 페칭 (무한 스크롤)
  const {
    data: myPicselsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyPicsels({
    size: 50,
    sort: sortType,
  });

  // 모든 페이지의 content를 합쳐서 Photo 형태로 변환 + 브랜드 필터 적용
  const photoData: Photo[] = useMemo(() => {
    if (!myPicselsData?.pages) {
      return [];
    }
    const allItems = myPicselsData.pages.flatMap(page => page.content);
    const filtered = isFilterActive
      ? allItems.filter(item => brandIds.includes(item.brand.brandId))
      : allItems;
    return filtered.map(item => ({
      id: item.picselId,
      uri: getImageUrl(item.imagePath),
      date: item.takenDate,
      storeName: item.storeName,
    }));
  }, [myPicselsData, brandIds, isFilterActive]);

  // 전체 탭에서 로드된 이미지를 메모리에 prefetch (월/년 탭 전환 시 즉시 렌더링)
  const photoUris = useMemo(() => photoData.map(p => p.uri), [photoData]);
  useImagePrefetch(photoUris);

  // 년/월별 그룹 데이터 (브랜드 필터 적용)
  const allContent = useMemo(() => {
    const items = myPicselsData?.pages.flatMap(page => page.content) ?? [];
    return isFilterActive
      ? items.filter(item => brandIds.includes(item.brand.brandId))
      : items;
  }, [myPicselsData, brandIds, isFilterActive]);

  const yearGroups: YearGroup[] = useMemo(
    () => groupByYearMonth(allContent),
    [allContent],
  );

  const totalPhotos = isFilterActive
    ? photoData.length
    : (myPicselsData?.pages[0]?.totalElements ?? 0);
  const hasPhotos = (myPicselsData?.pages[0]?.totalElements ?? 0) > 0;

  // 사진 선택
  const {
    isSelecting,
    selectedPhotos,
    setIsSelecting,
    toggleSelection,
    selectAll,
    resetSelection,
  } = usePhotoSelection();

  // 선택 모드 관리
  const {
    handleEnterSelecting,
    handleExitSelecting,
    selectionSheetRef: selectionBottomSheetRef,
  } = useSelectingMode({
    isSelecting,
    setIsSelecting,
    resetSelection,
  });

  // 스크롤 관리
  const { showUpButton, flatListRef, handleScroll, scrollToTop } =
    useScrollWithUpButton();

  // 기능 버튼 (업로드)
  const {
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,
  } = useFunctionButtons();

  // 사진 액션 (삭제, 이동)
  const { handleDelete, handleMove } = usePhotoActions({
    selectedPhotos,
    exitSelectingMode: handleExitSelecting,
  });

  // 날짜 필터 변경
  const handleDateFilterChange = (type: DateFilterType) => {
    setDateFilter(type);
  };

  // 년도별 폴더로 이동
  const handleViewAllYear = (year: string) => {
    navigation.navigate('YearFolder', { year });
  };

  // 월별 폴더로 이동
  const handleViewMonthFolder = (year: string, month: string) => {
    navigation.navigate('MonthFolder', { year, month });
  };

  // 정렬 액션시트
  const { showSortSheet } = useSortActionSheet({
    onSort: setSortType,
  });

  // 무한 스크롤: 끝에 도달 시 다음 페이지 로드
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    // 데이터
    photoData,
    yearGroups,
    isLoading,
    isFetchingNextPage,
    totalPhotos,
    hasPhotos,

    // 정렬
    sortType,
    showSortSheet,

    // 브랜드 필터
    isFilterActive,

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

    // 무한 스크롤
    handleEndReached,

    // 네비게이션
    handleViewAllYear,
    handleViewMonthFolder,
  };
};
