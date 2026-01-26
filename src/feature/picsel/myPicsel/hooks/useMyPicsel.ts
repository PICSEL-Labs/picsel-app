import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { usePhotoData } from '../../shared/utils/usePhotoData';
import { Photo } from '../components/ui/organisms/PhotoListView';
import { DateFilterType } from '../types';

import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/data/MOCK_YEAR_DATA';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

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

  // 사진 데이터 로딩
  const { data: photoData, isLoading } = usePhotoData<Photo>({
    loadData: () => {
      return MOCK_YEAR_DATA.flatMap(yearData =>
        yearData.months.flatMap(month => month.photos),
      );
    },
    delay: 2000,
  });

  const totalPhotos = photoData.length;
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
    console.log('날짜 필터:', type);
    // TODO: 날짜 필터링 로직 구현
  };

  // 년도별 폴더로 이동
  const handleViewAllYear = (year: string) => {
    navigation.navigate('YearFolder', { year });
  };

  // 월별 폴더로 이동
  const handleViewMonthFolder = (year: string, month: string) => {
    navigation.navigate('MonthFolder', { year, month });
  };

  return {
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
