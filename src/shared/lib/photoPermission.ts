import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

import { SAVE_PERMISSION_MODAL } from '@/shared/constants/text/photoPermissionText';
import { showConfirmModal } from '@/shared/lib/confirmModal';

/**
 * 사진 저장(쓰기)에 필요한 최소 권한을 요청
 * 읽기는 불필요하므로 ADD_ONLY 스코프만 받아 과도한 권한 요청을 피한다.
 */
export const requestPhotoPermission = async (): Promise<boolean> => {
  const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
};

/**
 * 사진 접근 권한을 요청하고, 거부된 경우 설정 이동으로 유도하는 모달을 띄운다.
 * @returns 권한 허용 여부
 */
export const requestPhotoPermissionWithModal = async (): Promise<boolean> => {
  const hasPermission = await requestPhotoPermission();
  if (!hasPermission) {
    showConfirmModal(SAVE_PERMISSION_MODAL.TITLE, openSettings, {
      title: SAVE_PERMISSION_MODAL.DESCRIPTION,
      confirmText: SAVE_PERMISSION_MODAL.CONFIRM,
      cancelText: SAVE_PERMISSION_MODAL.CANCEL,
    });
  }
  return hasPermission;
};
