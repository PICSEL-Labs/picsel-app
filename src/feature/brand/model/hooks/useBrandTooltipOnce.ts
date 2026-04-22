import { useEffect, useRef, useState } from 'react';

import { Animated, Easing } from 'react-native';

import { useTooltipStore } from '@/shared/store/ui/tooltip';

/**
 * useBrandTooltipOnce
 * - 브랜드 필터 툴팁은 최초 1번만 노출
 * - 3초 후 자동으로 사라지며, fade-out 애니메이션으로 서서히 사라지듯 구현
 */
export const useBrandTooltipOnce = () => {
  const [showBrandTooltip, setShowBrandTooltip] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { brandTooltipShown, setBrandTooltipShown } = useTooltipStore();

  useEffect(() => {
    if (brandTooltipShown) {
      return;
    }

    setShowBrandTooltip(true);
    setBrandTooltipShown(true);

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShowBrandTooltip(false);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return { showBrandTooltip, fadeAnim };
};
