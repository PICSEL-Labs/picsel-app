import { useCallback, useRef, useState } from 'react';

import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SHOW_DURATION = 180;
const HIDE_DURATION = 150;
const INITIAL_SCALE = 0.95;

export const useDropdownMenu = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(INITIAL_SCALE);

  const onCompleteRef = useRef<(() => void) | undefined>(undefined);

  const unmount = useCallback(() => setIsMounted(false), []);
  const callOnComplete = useCallback(() => {
    onCompleteRef.current?.();
    onCompleteRef.current = undefined;
  }, []);

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
      onCompleteRef.current = onComplete;

      setIsVisible(false);
      opacity.value = withTiming(
        0,
        { duration: HIDE_DURATION, easing: Easing.in(Easing.ease) },
        finished => {
          if (finished) {
            runOnJS(unmount)();
            runOnJS(callOnComplete)();
          }
        },
      );
      scale.value = withTiming(INITIAL_SCALE, {
        duration: HIDE_DURATION,
        easing: Easing.in(Easing.ease),
      });
    },
    [opacity, scale, unmount, callOnComplete],
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
