import { useWindowDimensions } from 'react-native';

interface UseImageDimensionsOptions {
  horizontalPadding?: number;
  itemSpacing?: number;
  columns?: number;
  aspectRatio?: number;
}

interface ImageDimensions {
  imageWidth: number;
  imageHeight: number;
  screenWidth: number;
}

/**
 * 화면 크기에 따른 이미지 크기를 계산하는 훅
 * @param options - 계산 옵션
 * @returns 계산된 이미지 크기 정보
 */
export const useImageDimensions = (
  options: UseImageDimensionsOptions = {},
): ImageDimensions => {
  const {
    horizontalPadding = 24,
    itemSpacing = 8,
    columns = 2,
    aspectRatio = 1.5,
  } = options;

  const { width: screenWidth } = useWindowDimensions();

  // 이미지 너비 계산: (화면 너비 - 좌우 패딩 - 아이템 간격) / 컬럼 수
  const imageWidth =
    (screenWidth - horizontalPadding * 2 - itemSpacing * (columns - 1)) /
    columns;

  // 이미지 높이 계산: 너비 * 비율
  const imageHeight = imageWidth * aspectRatio;

  return {
    imageWidth,
    imageHeight,
    screenWidth,
  };
};
