import { usePicselUploadStore } from './usePicselUploadStore';

import { showConfirmModal } from '@/shared/lib/confirmModal';
import { usePhotoStore } from '@/shared/store/picselUpload';

export const useConfirmExit = () => {
  const { reset: resetPhotoStore } = usePhotoStore();
  const { resetUploadData } = usePicselUploadStore();

  const confirmExitUpload = (onExit: () => void) => {
    const handleConfirmExit = () => {
      resetPhotoStore();
      resetUploadData();
      onExit();
    };

    showConfirmModal(
      '지금까지 입력한 정보가\n모두 지워져요',
      handleConfirmExit,
      {
        title: '업로드를 종료할까요?',
        confirmText: '종료',
        cancelText: '계속하기',
      },
    );
  };

  return { confirmExitUpload };
};
