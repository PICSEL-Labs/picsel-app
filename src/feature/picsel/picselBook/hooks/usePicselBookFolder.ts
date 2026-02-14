import { useMemo, useState } from 'react';

import { useGetPicselBookPicsels } from '../queries/useGetPicselBookPicsels';
import { PicselBookFolderSortType, PicselBookPicselItem } from '../types';

import { Photo } from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import {
  MY_PICSEL_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { getImageUrl } from '@/shared/utils/image';

type ViewMode = 'list' | 'textList';

interface UsePicselBookFolderOptions {
  bookId: string;
}

/**
 * PicselBook 폴더 템플릿을 위한 통합 hook
 * - 데이터 로딩 (API 연동)
 * - 선택 모드
 * - 스크롤 관리
 * - 사진 액션 (삭제, 이동)
 * - 기능 버튼 (업로드)
 * - 뷰 모드 (list, textList)
 * - 정렬 기능
 */
export const usePicselBookFolder = ({ bookId }: UsePicselBookFolderOptions) => {
  // 상태 관리
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortType, setSortType] =
    useState<PicselBookFolderSortType>('RECENT_DESC');

  // 픽셀북 내 픽셀 데이터 페칭 (API 연동)
  const { data, isLoading, refetch } = useGetPicselBookPicsels({
    picselbookId: bookId,
    sortType,
  });

  // API 데이터를 Photo 형태로 변환
  const photoData: Photo[] = useMemo(() => {
    if (!data?.content) {
      return [];
    }
    return data.content.map((item: PicselBookPicselItem) => ({
      id: item.picselId,
      uri: getImageUrl(item.representativeImagePath),
      date: item.takenDate,
      storeName: item.storeName,
    }));
  }, [data]);

  // 원본 데이터 (텍스트 리스트 뷰용)
  const rawData: PicselBookPicselItem[] = data?.content ?? [];

  const totalPhotos = data?.totalElements ?? 0;
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
    onDeleteSuccess: () => {
      resetSelection();
      refetch();
    },
    exitSelectingMode: handleExitSelecting,
  });

  // 정렬 액션시트
  const { showSortSheet } = useSortActionSheet({
    onSort: setSortType,
    options: MY_PICSEL_SORT_OPTIONS,
  });

  // 뷰 모드 토글
  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'list' ? 'textList' : 'list'));
  };

  // 사진 개수 포맷
  const formatPhotoCount = (count: number) => {
    return count.toLocaleString();
  };

  return {
    // 데이터
    photoData,
    rawData,
    isLoading,
    totalPhotos,
    hasPhotos,

    // 정렬
    sortType,
    showSortSheet,

    // 뷰 모드
    viewMode,
    handleToggleViewMode,

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

    // 유틸리티
    formatPhotoCount,

    // 리프레시
    refetch,
  };
};
