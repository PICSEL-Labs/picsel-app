import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

/**
 * 사진 저장(쓰기)에 필요한 최소 권한을 요청
 * 읽기는 불필요하므로 ADD_ONLY 스코프만 받아 과도한 권한 요청을 피한다.
 */
export const requestPhotoPermission = async (): Promise<boolean> => {
  const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
  return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
};
