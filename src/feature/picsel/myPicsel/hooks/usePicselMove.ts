import { useEffect, useState } from 'react';

import { NavigationProp } from '@react-navigation/native';

import { MOVE_ALERT, TOAST_MESSAGES } from '../constants/picselDetailTexts';
import { useMovePicsels } from '../mutations/useMovePicsels';
import { useGetPicselDetail } from '../queries/useGetPicselDetail';

import { usePicselBook } from '@/feature/picsel/picselBook/hooks/usePicselBook';
import { MainNavigationProps } from '@/navigation';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  picselIds: string[];
  currentPicselbookId?: string;
  navigation: NavigationProp<MainNavigationProps>;
}

export const usePicselMove = ({
  picselIds,
  currentPicselbookId,
  navigation,
}: Props) => {
  // 내픽셀 탭에서 이동 시 픽셀 상세 조회로 현재 픽셀북 ID를 가져옴
  const { data: picselDetail } = useGetPicselDetail(
    !currentPicselbookId ? picselIds[0] : '',
  );

  const resolvedPicselbookId =
    currentPicselbookId ?? picselDetail?.picselbook.picselbookId ?? '';

  const [selectedBookId, setSelectedBookId] = useState(resolvedPicselbookId);
  const [isListReady, setIsListReady] = useState(false);

  // 비동기로 픽셀 상세가 로드된 후 selectedBookId를 업데이트
  useEffect(() => {
    if (!currentPicselbookId && picselDetail?.picselbook.picselbookId) {
      setSelectedBookId(picselDetail.picselbook.picselbookId);
    }
  }, [currentPicselbookId, picselDetail]);

  const {
    picselBookRef,
    handleAddBook,
    handleSubmit,
    books,
    isLoading,
    isFetching,
  } = usePicselBook();

  const { mutate: movePicsels } = useMovePicsels();
  const { showToast } = useToastStore();

  const canMove = !!selectedBookId && selectedBookId !== resolvedPicselbookId;

  const handleMove = () => {
    if (!canMove) {
      return;
    }

    const selectedBookName =
      books.find(book => book.picselbookId === selectedBookId)?.bookName ?? '';

    showConfirmModal(
      MOVE_ALERT.DESCRIPTION,
      () => {
        movePicsels(
          { targetPicselbookId: selectedBookId, picselIds },
          {
            onSuccess: () => {
              showToast(TOAST_MESSAGES.MOVE_SUCCESS, 60);
              navigation.goBack();
            },
          },
        );
      },
      {
        title: MOVE_ALERT.TITLE(selectedBookName),
        confirmText: MOVE_ALERT.CONFIRM,
        cancelText: MOVE_ALERT.CANCEL,
      },
    );
  };

  return {
    picselBookRef,
    handleAddBook,
    handleSubmit,
    books,
    isLoading,
    isFetching,

    selectedBookId,
    setSelectedBookId,
    isListReady,
    setIsListReady,
    canMove,
    handleMove,
  };
};
