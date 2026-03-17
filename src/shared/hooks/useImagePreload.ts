import { useCallback, useEffect, useRef, useState } from 'react';

const TIMEOUT_MS = 8000;

// 모듈 레벨 전역 캐시: 한번 로드된 URI는 컴포넌트 unmount 후에도 기억
const globalLoadedUris = new Set<string>();

interface UseImagePreloadResult {
  isImagesLoaded: boolean;
  handleImageLoad: (uri: string) => void;
  handleImageError: (uri: string) => void;
}

export const useImagePreload = (uris: string[]): UseImagePreloadResult => {
  const allCached =
    uris.length === 0 || uris.every(uri => globalLoadedUris.has(uri));

  const [isImagesLoaded, setIsImagesLoaded] = useState(allCached);
  const loadedSetRef = useRef<Set<string>>(new Set());
  const totalRef = useRef(uris.length);
  const prevUrisRef = useRef<Set<string>>(new Set(uris));
  const prevLengthRef = useRef(uris.length);
  const changeCountRef = useRef(0);

  // 경량 변경 감지: 길이 변경 또는 새 URI 존재 여부
  const hasChanged =
    uris.length !== prevLengthRef.current ||
    uris.some(uri => !prevUrisRef.current.has(uri));

  if (hasChanged) {
    const prevUris = prevUrisRef.current;

    prevUrisRef.current = new Set(uris);
    prevLengthRef.current = uris.length;
    changeCountRef.current += 1;
    totalRef.current = uris.length;

    const allAlreadyLoaded =
      uris.length > 0 && uris.every(uri => globalLoadedUris.has(uri));

    if (allAlreadyLoaded) {
      loadedSetRef.current = new Set(uris);
      if (!isImagesLoaded) {
        setIsImagesLoaded(true);
      }
    } else {
      // 삭제 판별: 새 URI가 모두 이전 목록에 존재 (부분집합)
      const isSubset = uris.length > 0 && uris.every(uri => prevUris.has(uri));

      const preserved = new Set<string>();
      uris.forEach(uri => {
        if (globalLoadedUris.has(uri)) {
          preserved.add(uri);
        }
      });
      loadedSetRef.current = preserved;

      if (uris.length === 0) {
        if (!isImagesLoaded) {
          setIsImagesLoaded(true);
        }
      } else if (preserved.size >= uris.length) {
        if (!isImagesLoaded) {
          setIsImagesLoaded(true);
        }
      } else if (isImagesLoaded && isSubset) {
        // 삭제만 발생 → 로드 상태 유지
      } else {
        if (isImagesLoaded) {
          setIsImagesLoaded(false);
        }
      }
    }
  }

  // 안전 타임아웃: 이미지 로드 실패해도 UI가 스켈레톤에 머물지 않도록
  useEffect(() => {
    if (uris.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setIsImagesLoaded(true);
    }, TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [changeCountRef.current]);

  const handleComplete = useCallback((uri: string) => {
    globalLoadedUris.add(uri);

    if (loadedSetRef.current.has(uri)) {
      return;
    }

    loadedSetRef.current.add(uri);

    if (loadedSetRef.current.size >= totalRef.current) {
      setIsImagesLoaded(true);
    }
  }, []);

  return {
    isImagesLoaded,
    handleImageLoad: handleComplete,
    handleImageError: handleComplete,
  };
};
