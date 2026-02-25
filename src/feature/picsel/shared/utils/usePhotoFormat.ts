import { useMemo } from 'react';

import {
  DATE_FORMAT_SEPARATOR,
  MAX_PHOTO_COUNT,
} from '../../picselBook/constants/photo';

export const usePhotoFormat = () => {
  return useMemo(
    () => ({
      /**
       * 날짜를 YYYY.MM.DD 형식으로 포맷팅
       */
      formatDate: (date?: string | null) => {
        if (!date) {
          return '';
        }
        return date.replace(/-/g, DATE_FORMAT_SEPARATOR);
      },

      /**
       * 사진 개수를 포맷팅 (999+ 처리)
       */
      formatPhotoCount: (count: number) => {
        if (count === 0) {
          return '0';
        }
        if (count > MAX_PHOTO_COUNT) {
          return `${MAX_PHOTO_COUNT}+`;
        }
        return count.toString();
      },
    }),
    [],
  );
};
