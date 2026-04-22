import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { usePicselUploadStore } from '../../picselUpload/hooks/usePicselUploadStore';
import { CoverType } from '../../shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import { useCreatePicselBook } from '../mutations/useCreatePicselBook';
import { useCreatePicselBookDraft } from '../mutations/useCreatePicselBookDraft';
import { useDeletePicselBooks } from '../mutations/useDeletePicselBooks';
import { useGetPicselBooks } from '../queries/useGetPicselBooks';
import { PicselBookItem } from '../types';

import { usePicselBookActions } from './usePicselBookActions';

import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import {
  PICSEL_BOOK_SORT_OPTIONS,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/animation/useSortActionSheet';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { usePicselBookStore } from '@/shared/store/picselBook';
import { usePhotoStore } from '@/shared/store/picselUpload';
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
  const isFocused = useIsFocused();
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // 정렬 상태 (전역 store)
  const { sortType, setSortType } = usePicselBookStore();

  // 픽셀북 액션 (Context Menu)
  const {
    editNameBottomSheetRef,
    editCoverBottomSheetRef,
    editingBookId,
    editingBookName,
    bookCoverPhoto,
    handleEdit,
    handleEditSubmit,
    handleChangeCover,
    handleCoverEditSubmit,
    handleDelete,
  } = usePicselBookActions();

  // 픽셀북 데이터 로딩 (API 연동)
  const { data, isLoading, isFetching, refetch } = useGetPicselBooks({
    sort: sortType,
  });

  // 픽셀북 생성 mutation
  const { mutate: createPicselBook } = useCreatePicselBook();

  // 픽셀북 삭제 mutation
  const { mutate: deletePicselBooks } = useDeletePicselBooks();

  const { reset: resetPhotoStore } = usePhotoStore();
  const { mutateAsync: createDraft } = useCreatePicselBookDraft();

  const books: PicselBookItem[] = data ?? [];
  const totalBooks = books.length;
  const hasBooks = books.length > 0;

  const savedBookId = usePicselUploadStore(state => state.picselbookId);

  // 선택 관련
  const { isSelecting, setIsSelecting, resetSelection } = usePhotoSelection();
  const setPicselbookId = usePicselUploadStore(state => state.setPicselbookId);
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
  const handleSubmit = async (bookName: string, coverType: CoverType) => {
    picselBookRef.current?.dismiss();

    const draftUuid = await createDraft();

    const payload = {
      picselbookId: draftUuid,
      bookName,
      coverImagePath: coverType === 'photo' ? bookCoverPhoto : null,
    };

    createPicselBook(payload, {
      onSuccess: response => {
        if (bookCoverPhoto) {
          navigation.pop(1);
        }
        showToast(`"${bookName}"을 추가했어요`, 60);

        const newBookId = response.data?.picselbookId;

        if (newBookId) {
          setPicselbookId(newBookId, bookName);
          refetch();
        }

        resetPhotoStore();
      },
      onError: error => {
        console.error('픽셀북 생성 실패:', error);
      },
    });
  };

  // 픽셀북 클릭
  const handleBookPress = (
    bookId: string,
    bookName: string,
    isUploadStep: boolean = false,
  ) => {
    if (isSelecting) {
      setSelectedBookIds(prev =>
        prev.includes(bookId)
          ? prev.filter(id => id !== bookId)
          : [...prev, bookId],
      );
      return;
    }

    // 픽셀 업로드 내 픽셀북 선택 단계일 때
    if (isUploadStep) {
      setSelectedBookIds(prev => (prev.includes(bookId) ? [] : [bookId]));

      setPicselbookId(bookId, bookName);
      return;
    }

    navigation.navigate('PicselBookFolder', { bookId, bookName });
  };

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedBookIds.length === books.length) {
      setSelectedBookIds([]);
    } else {
      setSelectedBookIds(books.map(book => book.picselbookId));
    }
  };

  // 선택된 픽셀북 삭제
  const handleDeletePress = () => {
    if (selectedBookIds.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal('picselBook', selectedBookIds.length, () => {
      const deletedCount = selectedBookIds.length;
      deletePicselBooks(
        { picselbookIds: selectedBookIds },
        {
          onSuccess: () => {
            handleExitSelecting();
            showToast(`${deletedCount}개의 픽셀북을 삭제했어요`, 60);
          },
          onError: () => {
            showToast('픽셀북 삭제에 실패했어요', 60);
          },
        },
      );
    });
  };

  // 커버 편집 리턴 플로우: 이전 화면으로 돌아왔을 때만 바텀시트 오픈
  useEffect(() => {
    if (isFocused && editingBookId && bookCoverPhoto) {
      editCoverBottomSheetRef.current?.present();
    }
  }, [isFocused, bookCoverPhoto, editingBookId]);

  useEffect(() => {
    if (selectedBookIds.length === 0 && savedBookId && books.length > 0) {
      const target = books.find(b => b.picselbookId === savedBookId);
      if (target) {
        handleBookPress(target.picselbookId, target.bookName, true);
      }
    }
  }, [books, savedBookId, selectedBookIds.length, handleBookPress]);

  return {
    // 데이터
    books,
    isLoading,
    isFetching,
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
    handleEditSubmit,
    handleChangeCover,
    handleCoverEditSubmit,
    handleDelete,

    // 편집 상태
    editNameBottomSheetRef,
    editCoverBottomSheetRef,
    editingBookId,
    editingBookName,
    bookCoverPhoto,

    // Refs
    picselBookRef,
  };
};
