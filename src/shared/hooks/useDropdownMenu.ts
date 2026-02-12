import { useState, useCallback } from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const SHOW_DURATION = 180;
const HIDE_DURATION = 150;
const INITIAL_SCALE = 0.95;

export const useDropdownMenu = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(INITIAL_SCALE);

  const show = useCallback(() => {
    setIsMounted(true);
    setIsVisible(true);
    opacity.value = withTiming(1, {
      duration: SHOW_DURATION,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(1, {
      duration: SHOW_DURATION,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity, scale]);

  const hide = useCallback(
    (onComplete?: () => void) => {
      setIsVisible(false);
      opacity.value = withTiming(
        0,
        { duration: HIDE_DURATION, easing: Easing.in(Easing.ease) },
        finished => {
          if (finished) {
            runOnJS(setIsMounted)(false);
            if (onComplete) {
              runOnJS(onComplete)();
            }
          }
        },
      );
      scale.value = withTiming(INITIAL_SCALE, {
        duration: HIDE_DURATION,
        easing: Easing.in(Easing.ease),
      });
    },
    [opacity, scale],
  );

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return { isMounted, animatedStyle, show, hide, toggle };
};
