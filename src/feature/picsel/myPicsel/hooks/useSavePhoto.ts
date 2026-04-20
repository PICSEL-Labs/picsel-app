import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import ImageManipulator from 'react-native-image-manipulator';

import { TOAST_MESSAGES } from '../constants/photoViewerTexts';

import { useToastStore } from '@/shared/store/ui/toast';

/**
 * 원격 이미지 URI를 임시 파일로 다운로드한 뒤,
 * EXIF 메타데이터를 제거(re-encode)하고 CameraRoll에 저장
 *
 * CameraRoll.saveAsset은 원본 EXIF(위치 정보 등)를 그대로 저장하므로,
 * ImageManipulator로 재인코딩하여 민감한 메타데이터를 제거
 */
const saveToGallery = async (uri: string): Promise<void> => {
  const randomSuffix = Math.random().toString(36).slice(2);
  const tempPath = `${RNFS.TemporaryDirectoryPath}picsel_${Date.now()}_${randomSuffix}.jpg`;

  try {
    // 원격 URL → 로컬 임시 파일로 다운로드
    await RNFS.downloadFile({ fromUrl: uri, toFile: tempPath }).promise;

    // 변환 없이 재인코딩하여 EXIF 메타데이터 제거
    const { uri: strippedUri } = await ImageManipulator.manipulate(
      `file://${tempPath}`,
      [],
      { compress: 1, format: 'jpeg' },
    );

    await CameraRoll.saveAsset(strippedUri, { type: 'photo' });
  } finally {
    // 성공/실패 여부와 관계없이 임시 파일 정리
    await RNFS.unlink(tempPath).catch(e =>
      console.warn('임시 파일 삭제 실패:', e),
    );
  }
};

export const useSavePhoto = (uri: string) => {
  const { showToast } = useToastStore();

  const savePhoto = async () => {
    if (!uri) {
      return;
    }

    try {
      await saveToGallery(uri);
      showToast(TOAST_MESSAGES.SAVE_SUCCESS);
    } catch (error) {
      showToast(TOAST_MESSAGES.SAVE_FAILURE);
    }
  };

  return { savePhoto };
};
