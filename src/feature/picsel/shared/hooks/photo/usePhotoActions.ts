import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface UsePhotoActionsOptions {
  selectedPhotos: string[];
  onDeleteSuccess?: () => void;
  onMoveSuccess?: () => void;
}

interface UsePhotoActionsReturn {
  handleDelete: () => void;
  handleMove: () => void;
}

export const usePhotoActions = ({
  selectedPhotos,
  onDeleteSuccess,
  onMoveSuccess,
}: UsePhotoActionsOptions): UsePhotoActionsReturn => {
  const { showToast } = useToastStore();

  const handleDelete = () => {
    if (selectedPhotos.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal('photo', selectedPhotos.length, () => {
      showToast(`${selectedPhotos.length}장의 픽셀을 삭제했어요`, 60);
      onDeleteSuccess?.();
    });
  };

  const handleMove = () => {
    if (selectedPhotos.length === 0) {
      showToast('이동할 픽셀북을 선택해주세요', 60);
      return;
    }
    // TODO: 이동 로직 구현
    onMoveSuccess?.();
  };

  return {
    handleDelete,
    handleMove,
  };
};
