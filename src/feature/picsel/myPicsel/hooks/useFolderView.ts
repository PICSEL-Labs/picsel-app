import { useMemo } from 'react';

import { Photo } from '../components/ui/organisms/PhotoListView';
import { useGetMyPicsels } from '../queries/useGetMyPicsels';
import { getMonthFromDate, getYearFromDate } from '../utils/dateUtils';

import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';

interface UseFolderViewOptions {
  filterType: 'year' | 'month';
  year: string;
  month?: string;
}

/**
 * Year/Month 폴더 템플릿을 위한 통합 hook
 * - 년도별/월별 사진 데이터 로딩
 * - 선택 모드
 * - 스크롤 관리
 * - 사진 액션 (삭제, 이동)
 * - 기능 버튼 (업로드)
 */
export const useFolderView = ({
  filterType,
  year,
  month,
}: UseFolderViewOptions) => {
  // API에서 전체 데이터 페칭
  const { data: myPicselsData, isLoading } = useGetMyPicsels({
    page: 0,
    size: 1000, // 전체 데이터를 가져와 클라이언트에서 필터링
    sort: 'RECENT_DESC',
  });

  // 년도별/월별 필터링
  const photoData: Photo[] = useMemo(() => {
    if (!myPicselsData?.content) {
      return [];
    }

    const filtered = myPicselsData.content.filter(item => {
      const itemYear = getYearFromDate(item.takenDate);
      if (itemYear !== year) {
        return false;
      }

      if (filterType === 'month' && month) {
        const itemMonth = getMonthFromDate(item.takenDate);
        return itemMonth === month;
      }

      return true;
    });

    return filtered.map(item => ({
      id: item.picselId,
      uri: item.imagePath,
      date: item.takenDate,
      storeName: item.storeName,
    }));
  }, [myPicselsData, filterType, year, month]);

  const totalPhotos = photoData.length;

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
    onDeleteSuccess: resetSelection,
    exitSelectingMode: handleExitSelecting,
  });

  return {
    // 데이터
    photoData,
    isLoading,
    totalPhotos,

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
  };
};
