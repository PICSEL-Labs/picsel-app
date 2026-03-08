import { useState } from 'react';

import { NavigationProp } from '@react-navigation/native';

import { MOVE_ALERT, TOAST_MESSAGES } from '../constants/picselDetailTexts';
import { useMovePicsels } from '../mutations/useMovePicsels';

import { usePicselBook } from '@/feature/picsel/picselBook/hooks/usePicselBook';
import { MainNavigationProps } from '@/navigation';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  picselId: string;
  currentPicselbookId: string;
  navigation: NavigationProp<MainNavigationProps>;
}

export const usePicselMove = ({
  picselId,
  currentPicselbookId,
  navigation,
}: Props) => {
  const [selectedBookId, setSelectedBookId] = useState(currentPicselbookId);
  const [isListReady, setIsListReady] = useState(false);

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

  const canMove = !!selectedBookId && selectedBookId !== currentPicselbookId;

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
          { targetPicselbookId: selectedBookId, picselIds: [picselId] },
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
