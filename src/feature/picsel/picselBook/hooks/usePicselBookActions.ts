import { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { useDeletePicselBooks } from '../mutations/useDeletePicselBooks';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

export const usePicselBookActions = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const editBottomSheetRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastStore();
  const { mutate: deletePicselBooks } = useDeletePicselBooks();

  const handleEdit = (id: string, title: string) => {
    // TODO: 편집 바텀시트 열기 및 id 사용
    console.log('Edit book:', id, title);
    editBottomSheetRef.current?.present();
  };

  const handleChangeCover = (id: string) => {
    // TODO: 커버 사진 변경 플로우에서 id 사용
    console.log('Change cover:', id);
    navigation.navigate('SelectMainPhoto');
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
    editBottomSheetRef,
    handleEdit,
    handleChangeCover,
    handleDelete,
  };
};
