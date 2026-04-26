import { openSettings } from 'react-native-permissions';
import { Camera } from 'react-native-vision-camera';

import { CAMERA_PERMISSION_MODAL } from '@/shared/constants/text/cameraPermissionText';
import { showConfirmModal } from '@/shared/lib/confirmModal';

export const requestCameraPermission = async (): Promise<boolean> => {
  const result = await Camera.requestCameraPermission();
  return result === 'granted';
};

export const requestCameraPermissionWithModal = async (): Promise<boolean> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    showConfirmModal(CAMERA_PERMISSION_MODAL.TITLE, openSettings, {
      title: CAMERA_PERMISSION_MODAL.DESCRIPTION,
      confirmText: CAMERA_PERMISSION_MODAL.CONFIRM,
      cancelText: CAMERA_PERMISSION_MODAL.CANCEL,
    });
  }
  return hasPermission;
};
