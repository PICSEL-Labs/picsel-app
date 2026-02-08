import { useNavigation } from '@react-navigation/native';

import { usePicselUploadStore } from './usePicselUploadStore';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { usePhotoStore } from '@/shared/store/picselUpload';

export const useConfirmExit = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { reset: resetPhotoStore } = usePhotoStore();
  const { resetUploadData } = usePicselUploadStore();

  const handleConfirmExit = () => {
    resetPhotoStore();
    resetUploadData();

    navigation.replace('QrScan');
  };

  const confirmExitUpload = () => {
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

  return {
    confirmExitUpload,
  };
};
