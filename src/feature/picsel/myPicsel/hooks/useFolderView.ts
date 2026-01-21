import { usePhotoData } from '../../shared/utils/usePhotoData';
import { Photo } from '../components/ui/organisms/PhotoListView';

import { MOCK_YEAR_DATA } from '@/feature/picsel/myPicsel/data/MOCK_YEAR_DATA';
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
  // 년도별/월별 사진 데이터 로딩
  const { data: photoData, isLoading } = usePhotoData<Photo>({
    loadData: () => {
      const yearData = MOCK_YEAR_DATA.find(data => data.year === year);
      if (!yearData) {
        return [];
      }

      if (filterType === 'year') {
        // 년도별: 모든 월의 사진 반환
        return yearData.months.flatMap(m => m.photos);
      } else {
        // 월별: 특정 월의 사진만 반환
        const monthData = yearData.months.find(m => m.month === month);
        return monthData?.photos || [];
      }
    },
    delay: 1000,
    deps: [year, month, filterType],
  });

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
