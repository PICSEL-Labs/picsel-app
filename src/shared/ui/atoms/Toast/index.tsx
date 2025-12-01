import React, { useEffect, useRef, useState } from 'react';

import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/shared/store/ui/toast';

const GRADIENT_COLORS = [
  'rgba(17, 17, 20, 0.9)',
  'rgba(17, 17, 20, 0.9)',
  'rgba(17, 17, 20, 1.3)',
  'rgba(17, 17, 20, 0.8)',
  'rgba(17, 17, 20, 0.8)',
];

const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.95, 1];

const ANIMATION_DURATION = 250;
const TOAST_DISPLAY_DURATION = 1500;

const Toast = () => {
  const { message, visible, hideToast, marginBottom } = useToastStore();
  const insets = useSafeAreaInsets();

  const [shouldRender, setShouldRender] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const setAnimatingFalse = () => {
    isAnimatingRef.current = false;
  };

  const animateHide = (onComplete?: () => void) => {
    isAnimatingRef.current = true;

    translateY.value = withTiming(
      100,
      { duration: ANIMATION_DURATION, easing: Easing.in(Easing.cubic) },
      () => {
        runOnJS(setAnimatingFalse)();
        runOnJS(setShouldRender)(false);
        if (onComplete) {
          runOnJS(onComplete)();
        }
      },
    );

    opacity.value = withTiming(0, { duration: ANIMATION_DURATION - 50 });
  };

  const animateShow = () => {
    isAnimatingRef.current = true;

    translateY.value = withTiming(
      0,
      { duration: ANIMATION_DURATION, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(setAnimatingFalse)();
      },
    );

    opacity.value = withTiming(1, { duration: ANIMATION_DURATION - 50 });
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      animateHide(hideToast);
    }, TOAST_DISPLAY_DURATION);
  };

  useEffect(() => {
    if (visible) {
      // 케이스 1: 이미 보이는 상태에서 새 메시지 → 즉시 업데이트
      if (shouldRender && displayMessage !== message) {
        clearHideTimer();
        animateHide(() => {
          setDisplayMessage(message);
          setShouldRender(true);

          setTimeout(() => {
            animateShow();
            scheduleHide();
          }, 50);
        });
      }

      // 케이스 2: 최초 표시
      else if (!shouldRender) {
        setDisplayMessage(message);
        setShouldRender(true);

        translateY.value = 100;
        opacity.value = 0;

        animateShow();
        scheduleHide();
      }
    } else {
      clearHideTimer();
      if (shouldRender) {
        animateHide();
      }
    }

    return () => {
      clearHideTimer();
    };
  }, [visible, message]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: insets.bottom + (marginBottom ?? 48),
          width: '100%',
          zIndex: 9999,
        },
      ]}
      className="items-center">
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={GRADIENT_LOCATIONS}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="h-[40px] w-[288px] items-center justify-center rounded-xl">
        <Text className="text-center text-white body-rg-02">
          {displayMessage}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default Toast;
