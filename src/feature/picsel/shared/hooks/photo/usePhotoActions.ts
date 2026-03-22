import { useDeletePicsels } from '@/feature/picsel/myPicsel/mutations/useDeletePicsels';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface UsePhotoActionsOptions {
  selectedPhotos: string[];
  navigation: RootStackNavigationProp;
  currentPicselbookId?: string;
  onDeleteSuccess?: () => void;
  exitSelectingMode?: () => void;
}

interface UsePhotoActionsReturn {
  handleDelete: () => void;
  handleMove: () => void;
  isDeleting: boolean;
}

export const usePhotoActions = ({
  selectedPhotos,
  navigation,
  currentPicselbookId,
  onDeleteSuccess,
  exitSelectingMode,
}: UsePhotoActionsOptions): UsePhotoActionsReturn => {
  const { showToast } = useToastStore();
  const { mutate: deletePicsels, isPending: isDeleting } = useDeletePicsels();

  const handleDelete = () => {
    if (selectedPhotos.length === 0) {
      showToast('삭제할 픽셀을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal('photo', selectedPhotos.length, () => {
      deletePicsels(
        { picselIds: selectedPhotos },
        {
          onSuccess: () => {
            showToast(`${selectedPhotos.length}장의 픽셀을 삭제했어요`, 60);
            onDeleteSuccess?.();
            exitSelectingMode?.();
          },
          onError: () => {
            showToast('픽셀 삭제에 실패했어요', 60);
          },
        },
      );
    });
  };

  const handleMove = () => {
    if (selectedPhotos.length === 0) {
      showToast('이동할 픽셀북을 선택해주세요', 60);
      return;
    }

    if (selectedPhotos.length === 1) {
      exitSelectingMode?.();
      navigation.navigate('PicselMove', {
        picselIds: selectedPhotos,
        currentPicselbookId,
      });
    } else {
      // TODO: 다중 선택 이동 구현
      showToast('현재 1장씩만 이동할 수 있어요', 60);
    }
  };

  return {
    handleDelete,
    handleMove,
    isDeleting,
  };
};
