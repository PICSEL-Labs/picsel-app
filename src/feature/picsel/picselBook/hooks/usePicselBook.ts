import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import {
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '../../shared/hooks/animation/useSortActionSheet';
import { useGetPicselBooks } from '../queries/useGetPicselBooks';
import { PicselBookItem } from '../types';

import { usePicselBookActions } from './usePicselBookActions';

import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { usePicselBookStore } from '@/shared/store/picselBook';
import { useToastStore } from '@/shared/store/ui/toast';

/**
 * PicselBook 템플릿을 위한 통합 hook
 * - 픽셀북 데이터 관리
 * - 선택 모드
 * - 스크롤 관리
 * - 기능 버튼 (업로드)
 * - 픽셀북 액션 (생성, 삭제, 수정)
 * - 정렬 기능
 */
export const usePicselBook = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // 정렬 상태 (전역 store)
  const { sortType, setSortType } = usePicselBookStore();

  // 픽셀북 액션 (Context Menu)
  const { handleEdit, handleChangeCover, handleDelete } =
    usePicselBookActions();

  // 픽셀북 데이터 로딩 (API 연동)
  const { data, isLoading, refetch } = useGetPicselBooks({
    sort: sortType,
  });

  const books: PicselBookItem[] = data?.content ?? [];
  const totalBooks = data?.totalElements ?? 0;
  const hasBooks = totalBooks > 0;

  // 선택 관련
  const { isSelecting, setIsSelecting, resetSelection } = usePhotoSelection();
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  // 스크롤 관리
  const { showUpButton, scrollToTop } = useScrollWithUpButton();

  // 선택 모드 관리
  const { handleEnterSelecting, handleExitSelecting, selectionSheetRef } =
    useSelectingMode({
      isSelecting,
      setIsSelecting,
      resetSelection: () => {
        setSelectedBookIds([]);
        resetSelection();
      },
    });

  // 기능 버튼 (업로드)
  const {
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,
  } = useFunctionButtons();

  // 정렬 액션시트
  const { showSortSheet } = useSortActionSheet({
    onSort: setSortType,
    options: PICSEL_BOOK_SORT_OPTIONS,
  });

  // 픽셀북 추가 바텀시트 열기
  const handleAddBook = () => {
    picselBookRef.current?.present();
  };

  // 픽셀북 생성
  const handleSubmit = (bookName: string) => {
    // TODO: 픽셀북 생성 API 호출
    console.log('픽셀북 생성:', bookName);
    refetch();
  };

  // 픽셀북 클릭
  const handleBookPress = (bookId: string) => {
    if (isSelecting) {
      setSelectedBookIds(prev =>
        prev.includes(bookId)
          ? prev.filter(id => id !== bookId)
          : [...prev, bookId],
      );
    } else {
      navigation.navigate('PicselBookFolder', { bookId });
    }
  };

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedBookIds.length === books.length) {
      setSelectedBookIds([]);
    } else {
      setSelectedBookIds(books.map(book => book.picselBookId));
    }
  };

  // 선택된 픽셀북 삭제
  const handleDeletePress = () => {
    if (selectedBookIds.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal('picselBook', selectedBookIds.length, () => {
      // TODO: 픽셀북 삭제 API 호출
      const deletedCount = selectedBookIds.length;
      handleExitSelecting();
      showToast(`${deletedCount}개의 픽셀북을 삭제했어요`, 60);
      refetch();
    });
  };

  return {
    // 데이터
    books,
    isLoading,
    totalBooks,
    hasBooks,

    // 정렬
    sortType,
    showSortSheet,

    // 선택 모드
    isSelecting,
    selectedBookIds,
    handleEnterSelecting,
    handleExitSelecting,
    handleSelectAll,
    selectionSheetRef,

    // 스크롤
    showUpButton,
    scrollToTop,

    // 기능 버튼
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,

    // 픽셀북 액션
    handleAddBook,
    handleSubmit,
    handleBookPress,
    handleDeletePress,
    handleEdit,
    handleChangeCover,
    handleDelete,

    // Refs
    picselBookRef,

    // 리프레시
    refetch,
  };
};
