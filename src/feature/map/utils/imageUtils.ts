/**
 * 즐겨찾기 상태에 따라 이미지 URL에 _FAV 접미사 추가
 * @param imageUrl - 원본 이미지 URL (예: /img/brand/logo/BYTP.png)
 * @param isFavorite - 즐겨찾기 여부
 * @returns 변환된 이미지 URL (예: /img/brand/logo/BYTP_FAV.png)
 */
export const getFavoriteImageUrl = (
  imageUrl: string,
  isFavorite: boolean,
): string => {
  if (!isFavorite || !imageUrl) {
    return imageUrl;
  }

  // 파일 확장자와 파일명 분리
  const lastDotIndex = imageUrl.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return `${imageUrl}_FAV`;
  }

  const fileName = imageUrl.substring(0, lastDotIndex);
  const extension = imageUrl.substring(lastDotIndex);

  return `${fileName}_FAV${extension}`;
};
