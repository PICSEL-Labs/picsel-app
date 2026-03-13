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
  const prevKeyRef = useRef<string>(uris.join(','));

  const stableKey = uris.join(',');

  // 렌더 중 동기적으로 key 변경 감지 → 1프레임 깜빡임 방지
  if (prevKeyRef.current !== stableKey) {
    const allAlreadyLoaded =
      uris.length > 0 && uris.every(uri => globalLoadedUris.has(uri));

    // 삭제 판별용: 업데이트 전 이전 URI 목록 캡처
    const prevUrisForSubset = new Set(prevKeyRef.current.split(','));

    prevKeyRef.current = stableKey;
    totalRef.current = uris.length;

    if (allAlreadyLoaded) {
      // 모든 URI가 이미 로드 완료된 경우 (삭제, 재정렬, 탭 전환 등) → 스켈레톤 스킵
      loadedSetRef.current = new Set(uris);
      if (!isImagesLoaded) {
        setIsImagesLoaded(true);
      }
    } else {
      // 삭제 등으로 URI가 줄어든 경우 (subset) → 스켈레톤 유지하지 않음
      const isSubset =
        uris.length > 0 && uris.every(uri => prevUrisForSubset.has(uri));

      // 새 URI 중 이미 로드된 것은 유지
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
        // 이전 목록의 부분집합 (삭제만 발생) → 로드 상태 유지
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
  }, [stableKey]);

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
