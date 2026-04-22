import { useEffect, useRef } from 'react';

import { Image } from 'react-native';

/**
 * 이미지 URI 배열을 메모리에 prefetch하는 훅
 * - 전체 탭에서 이미지가 로드된 후 호출하면
 *   월/년 탭 전환 시 메모리 캐시에서 즉시 렌더링됨
 */

export const useImagePrefetch = (uris: string[]) => {
  const prefetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    uris.forEach(uri => {
      if (uri && !prefetchedRef.current.has(uri)) {
        prefetchedRef.current.add(uri);
        Image.prefetch(uri).catch(() => {
          // force-cache fallback
        });
      }
    });
  }, [uris]);
};
