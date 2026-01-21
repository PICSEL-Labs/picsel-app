import { useState } from 'react';

import { usePhotoData } from '../../shared/utils/usePhotoData';
import { usePhotoFormat } from '../../shared/utils/usePhotoFormat';

import type { Photo } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';
import { MOCK_PICSEL_BOOK_PHOTO_DATA } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoActions } from '@/feature/picsel/shared/hooks/photo/usePhotoActions';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';

type ViewMode = 'list' | 'textList';

interface UsePicselBookFolderOptions {
  bookId: string;
}

/**
 * PicselBook 폴더 템플릿을 위한 통합 hook
 * - 데이터 로딩
 * - 선택 모드
 * - 스크롤 관리
 * - 사진 액션 (삭제, 이동)
 * - 기능 버튼 (업로드)
 * - 뷰 모드 (list, textList)
 */
export const usePicselBookFolder = ({ bookId }: UsePicselBookFolderOptions) => {
  // 초기 데이터 설정
  const initialBookData = MOCK_PICSEL_BOOK_PHOTO_DATA.find(
    data => data.bookId === bookId,
  );

  // 상태 관리
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [bookTitle, setBookTitle] = useState(initialBookData?.bookTitle || '');

  // 데이터 로딩
  const { data: photoData, isLoading } = usePhotoData<Photo>({
    loadData: () => {
      const bookData = MOCK_PICSEL_BOOK_PHOTO_DATA.find(
        data => data.bookId === bookId,
      );
      if (bookData) {
        setBookTitle(bookData.bookTitle);
        return bookData.photos;
      }
      setBookTitle('');
      return [];
    },
    delay: 1000,
    deps: [bookId],
  });

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

  // 유틸리티
  const { formatPhotoCount } = usePhotoFormat();

  // 뷰 모드 토글
  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'list' ? 'textList' : 'list'));
  };

  return {
    // 데이터
    photoData,
    bookTitle,
    isLoading,
    totalPhotos: photoData.length,

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
  };
};
