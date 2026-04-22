import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import { ImageType } from '../api/images/types';

import { getPresignedUrlApi } from '@/shared/api/images/getPresignedUrlApi';

/**
 * iOS 전용 ph:// 스키마 주소를 실제 파일 시스템 경로로 변환
 * @param {string} uri - 변환할 이미지 URI (ph://...)
 * @returns {Promise<string>} 변환된 파일 시스템 경로
 */
const resolveLocalFilePath = async (uri: string): Promise<string> => {
  if (!uri.startsWith('ph://')) {
    return uri;
  }

  try {
    const imageData = await CameraRoll.iosGetImageDataById(uri);
    const resolvedPath = imageData.node.image.filepath;

    if (!resolvedPath) {
      return uri;
    }
    return resolvedPath;
  } catch (error) {
    console.error('iOS 이미지 경로 변환 실패:', error);
    return uri;
  }
};

/**
 * 로컬 이미지 URI를 받아 S3 저장소에 업로드하고, 서버(DB) 저장에 필요한 최종 URL을 반환
 * @param {string} uri - 업로드할 로컬 이미지 URI
 * @param uuid draftUuid - 이미지 업로드 시 서버에서 Presigned URL 발급을 위해 필요한 고유 식별자
 * @param {ImageType} type - 이미지 업로드 타입
 * @returns {Promise<string>} S3 업로드 완료 후 생성된 이미지의 최종 URL
 */
export const uploadImageToS3 = async (
  uri: string,
  uuid: string,
  type: ImageType,
): Promise<string> => {
  const localPath = await resolveLocalFilePath(uri);

  // Presigned URL 획득
  const {
    data: { presignedUrl, fileUrl },
  } = await getPresignedUrlApi(uuid, type);

  // 파일 Fetch 및 Blob 변환
  const response = await fetch(localPath);
  const blob = await response.blob();

  // S3 업로드 실행
  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    body: blob,
    headers: { 'Content-Type': 'image/jpeg' },
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 업로드 실패: ${uploadResponse.statusText}`);
  }

  return fileUrl;
};

/**
 * 여러 장의 이미지 URI 배열을 받아 병렬로 S3에 업로드
 * @param {string[]} uris - 업로드할 로컬 이미지 URI 배열
 * @param uuid draftUuid - 이미지 업로드 시 서버에서 Presigned URL 발급을 위해 필요한 고유 식별자
 * @param {ImageType} type - 이미지 업로드 타입
 * @returns {Promise<string[]>} 업로드된 모든 이미지의 최종 URL 배열
 * @description 모든 이미지는 Promise.all을 통해 동시에 업로드 시작
 */
export const uploadMultipleImagesToS3 = async (
  uris: string[],
  uuid: string,
  type: ImageType,
): Promise<string[]> => {
  return Promise.all(uris.map(uri => uploadImageToS3(uri, uuid, type)));
};
