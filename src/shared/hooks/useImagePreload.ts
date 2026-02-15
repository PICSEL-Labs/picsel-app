import { useCallback, useEffect, useRef, useState } from 'react';

const TIMEOUT_MS = 8000;

interface UseImagePreloadResult {
  isImagesLoaded: boolean;
  handleImageLoad: (uri: string) => void;
  handleImageError: (uri: string) => void;
}

export const useImagePreload = (uris: string[]): UseImagePreloadResult => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(uris.length === 0);
  const loadedSetRef = useRef<Set<string>>(new Set());
  const totalRef = useRef(uris.length);
  const prevKeyRef = useRef<string>(uris.join(','));

  const stableKey = uris.join(',');

  // 렌더 중 동기적으로 key 변경 감지 → 1프레임 깜빡임 방지
  if (prevKeyRef.current !== stableKey) {
    prevKeyRef.current = stableKey;
    loadedSetRef.current = new Set();
    totalRef.current = uris.length;

    if (uris.length === 0) {
      if (!isImagesLoaded) {
        setIsImagesLoaded(true);
      }
    } else {
      if (isImagesLoaded) {
        setIsImagesLoaded(false);
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
  }, [stableKey]);

  const handleComplete = useCallback((uri: string) => {
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
