import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { useDeletePicselBooks } from '../mutations/useDeletePicselBooks';
import { usePatchPicselBook } from '../mutations/usePatchPicselBook';

import { CoverType } from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { useToastStore } from '@/shared/store/ui/toast';

interface HandleEditNameSubmitOptions {
  onSuccess?: () => void;
}

export const usePicselBookActions = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const editNameBottomSheetRef = useRef<BottomSheetModal>(null);
  const editCoverBottomSheetRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastStore();
  const { mutate: deletePicselBooks } = useDeletePicselBooks();
  const { mutate: patchPicselBook } = usePatchPicselBook();
  const { bookCoverPhoto, reset: resetPhotoStore } = usePhotoStore();

  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editingBookName, setEditingBookName] = useState('');

  const handleEdit = (id: string, title: string) => {
    setEditingBookId(id);
    setEditingBookName(title);
    editNameBottomSheetRef.current?.present();
  };

  const handleEditSubmit = (
    bookName: string,
    options?: HandleEditNameSubmitOptions,
  ) => {
    if (!editingBookId) return;

    patchPicselBook(
      { picselbookId: editingBookId, bookName },
      {
        onSuccess: () => {
          showToast(`"${bookName}"(으)로 이름을 변경했어요`);
          setEditingBookId(null);
          setEditingBookName('');
          options?.onSuccess?.();
        },
        onError: () => {
          showToast('이름 변경에 실패했어요');
        },
      },
    );
  };

  const handleChangeCover = (id: string) => {
    setEditingBookId(id);
    navigation.navigate('SelectBookCover', {
      variant: 'cover',
      bookName: '',
      picselbookId: id,
    });
  };

  const handleCoverEditSubmit = (coverType: CoverType) => {
    if (!editingBookId) return;

    const coverImagePath = coverType === 'default' ? null : bookCoverPhoto;
    if (coverType === 'photo' && !coverImagePath) return;

    patchPicselBook(
      { picselbookId: editingBookId, coverImagePath },
      {
        onSuccess: () => {
          showToast(
            coverType === 'default'
              ? '커버사진을 기본으로 변경했어요'
              : '커버사진을 변경했어요',
          );
          setEditingBookId(null);
          resetPhotoStore();
        },
        onError: () => {
          showToast('커버사진 변경에 실패했어요');
        },
      },
    );
  };

  const handleDelete = (id: string, title: string) => {
    showConfirmModal(
      '삭제 시 복구가 불가능해요',
      () => {
        deletePicselBooks(
          { picselbookIds: [id] },
          {
            onSuccess: () => {
              showToast(`${title} 픽셀북을 삭제했어요`);
            },
            onError: () => {
              showToast('픽셀북 삭제에 실패했어요');
            },
          },
        );
      },
      {
        title: `${title} 픽셀북을\n삭제할까요?`,
        confirmText: '삭제',
        cancelText: '취소',
      },
    );
  };

  return {
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
  };
};
