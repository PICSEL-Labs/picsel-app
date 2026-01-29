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
import { useMyPicselStore } from '@/shared/store';

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

  // 내 픽셀 데이터 페칭
  const { data: myPicselsData, isLoading } = useGetMyPicsels({
    page: 0,
    size: 20,
    sort: sortType,
  });

  // API 데이터를 Photo 형태로 변환
  const photoData: Photo[] = useMemo(() => {
    if (!myPicselsData?.content) {
      return [];
    }
    return myPicselsData.content.map(item => ({
      id: item.picselId,
      uri: item.imagePath,
      date: item.takenDate,
      storeName: item.storeName,
    }));
  }, [myPicselsData]);

  // 년/월별 그룹 데이터
  const yearGroups: YearGroup[] = useMemo(() => {
    if (!myPicselsData?.content) {
      return [];
    }
    return groupByYearMonth(myPicselsData.content);
  }, [myPicselsData]);

  const totalPhotos = myPicselsData?.totalElements ?? 0;
  const hasPhotos = totalPhotos > 0;

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

  return {
    // 데이터
    photoData,
    yearGroups,
    isLoading,
    totalPhotos,
    hasPhotos,

    // 정렬
    sortType,
    showSortSheet,

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

    // 네비게이션
    handleViewAllYear,
    handleViewMonthFolder,
  };
};
