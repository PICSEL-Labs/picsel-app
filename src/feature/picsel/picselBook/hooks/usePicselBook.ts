import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { usePhotoData } from '../../shared/utils/usePhotoData';

import { usePicselBookActions } from './usePicselBookActions';

import { MOCK_PICSEL_BOOK_DATA } from '@/feature/picsel/picselBook/data/mockPicselBookData';
import { useScrollWithUpButton } from '@/feature/picsel/shared/hooks/animation/useScrollWithUpButton';
import { useSelectingMode } from '@/feature/picsel/shared/hooks/animation/useSelectingMode';
import { usePhotoSelection } from '@/feature/picsel/shared/hooks/photo/usePhotoSelection';
import { useFunctionButtons } from '@/feature/picsel/shared/hooks/useFunctionButtons';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Book {
  id: string;
  title: string;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * PicselBook 템플릿을 위한 통합 hook
 * - 픽셀북 데이터 관리
 * - 선택 모드
 * - 스크롤 관리
 * - 기능 버튼 (업로드)
 * - 픽셀북 액션 (생성, 삭제, 수정)
 */
export const usePicselBook = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { showToast } = useToastStore();
  const picselBookRef = useRef<BottomSheetModal>(null);

  // 픽셀북 액션 (Context Menu)
  const { handleEdit, handleChangeCover, handleDelete } =
    usePicselBookActions();

  // 픽셀북 데이터 로딩
  const {
    data: books,
    isLoading,
    setData: setBooks,
  } = usePhotoData<Book>({
    loadData: () => MOCK_PICSEL_BOOK_DATA,
    delay: 2000,
  });

  const totalBooks = books.length;
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

  // 픽셀북 추가 바텀시트 열기
  const handleAddBook = () => {
    picselBookRef.current?.present();
  };

  // 픽셀북 생성
  const handleSubmit = (bookName: string) => {
    // TODO: 픽셀북 생성 API 호출
    console.log('픽셀북 생성:', bookName);

    const newBook: Book = {
      id: String(books.length + 1),
      title: bookName,
      photoCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBooks([newBook, ...books]);
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
    if (selectedBookIds.length === totalBooks) {
      setSelectedBookIds([]);
    } else {
      setSelectedBookIds(books.map(book => book.id));
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
    });
  };

  return {
    // 데이터
    books,
    isLoading,
    totalBooks,
    hasBooks,

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
  };
};
