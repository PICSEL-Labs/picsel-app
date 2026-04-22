import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

const SUPPORTED_EXTS = ['png', 'gif', 'webp'] as const;

const extFromMime = (mime: string): string =>
  SUPPORTED_EXTS.find(ext => mime.includes(ext)) ?? 'jpg';

export const savePhotoFromBase64 = async (
  base64: string,
  mimeType: string,
): Promise<void> => {
  const ext = extFromMime(mimeType);
  const randomSuffix = Math.random().toString(36).slice(2);
  const tempPath = `${RNFS.TemporaryDirectoryPath}qr_${Date.now()}_${randomSuffix}.${ext}`;
  const base64Body = base64.replace(/^data:.*?;base64,/, '');

  try {
    await RNFS.writeFile(tempPath, base64Body, 'base64');
    await CameraRoll.saveAsset(`file://${tempPath}`, { type: 'photo' });
  } finally {
    await RNFS.unlink(tempPath).catch(e =>
      console.warn('임시 파일 삭제 실패:', e),
    );
  }
};
