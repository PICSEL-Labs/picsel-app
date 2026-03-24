import Config from 'react-native-config';

/**
 * 서버에서 받은 이미지 경로에 IMAGE_URL을 붙여 완전한 URL을 생성
 *
 * 서버 응답이 `/img/...` 또는 `img/...` 등 일관적이지 않을 수 있으므로
 * 슬래시 중복/누락을 방어하여 안전하게 URL을 조합
 *
 * @param path - 서버에서 받은 이미지 상대 경로
 * @returns 완전한 이미지 URL (path가 falsy하면 빈 문자열 반환)
 *
 * @example
 * getImageUrl('/img/picsel/abc.jpg')  // https://imgdev.picsel.co.kr/img/picsel/abc.jpg
 * getImageUrl('img/picsel/abc.jpg')   // https://imgdev.picsel.co.kr/img/picsel/abc.jpg
 * getImageUrl('')                      // ''
 * getImageUrl(undefined)               // ''
 */
export const getImageUrl = (path?: string | null): string => {
  if (!path) {
    return '';
  }

  const baseUrl = (Config.IMAGE_URL ?? '').replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
};

/**
 * 완전한 이미지 URL에서 IMAGE_URL을 제거하여 상대 경로를 반환 (getImageUrl의 역연산)
 *
 * @param url - 완전한 이미지 URL
 * @returns 상대 경로
 *
 * @example
 * getRelativeImagePath('https://imgdev.picsel.co.kr/img/picsel/abc.jpg')  // 'img/picsel/abc.jpg'
 */
export const getRelativeImagePath = (url: string): string => {
  const baseUrl = (Config.IMAGE_URL ?? '').replace(/\/+$/, '');
  return url.replace(`${baseUrl}/`, '');
};
