import { useEffect, useState } from 'react';

/**
 * 모달 애니메이션을 위한 커스텀 훅
 * visible과 config를 받아서 애니메이션 타이밍을 고려한 상태를 반환
 *
 * @param visible - 모달의 visible 상태
 * @param config - 모달의 config 데이터
 * @param animationDuration - 애니메이션 지속 시간 (기본값: 300ms)
 * @returns { isVisible, currentConfig } - 애니메이션을 고려한 visible과 config 상태
 */

export function useModalAnimation<T>(
  visible: boolean,
  config: T | null,
  animationDuration: number = 300,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<T | null>(config);

  useEffect(() => {
    if (visible && config) {
      // 모달 열기: config와 visible 동시 설정
      setCurrentConfig(config);
      setIsVisible(true);
    } else if (!visible) {
      // 모달 닫기: visible만 먼저 false
      setIsVisible(false);
      // 애니메이션이 끝난 후 config 클리어
      const timer = setTimeout(() => {
        setCurrentConfig(null);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, config, animationDuration]);

  return { isVisible, currentConfig };
}
