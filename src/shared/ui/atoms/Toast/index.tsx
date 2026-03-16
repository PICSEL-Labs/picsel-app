import React, { useEffect, useRef, useState } from 'react';

import { Modal, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  FADE_DURATION,
  GRADIENT_COLORS,
  GRADIENT_LOCATIONS,
  SLIDE_DURATION,
  TOAST_DISPLAY_DURATION,
} from '@/shared/constants/styles/toast';
import { useToastStore } from '@/shared/store/ui/toast';

const Toast = () => {
  const { message, visible, hideToast, marginBottom, height } = useToastStore();
  const insets = useSafeAreaInsets();

  const [shouldRender, setShouldRender] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const previousMessageRef = useRef<string>('');

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const slideOut = (onComplete?: () => void) => {
    translateY.value = withTiming(
      150,
      { duration: SLIDE_DURATION, easing: Easing.in(Easing.ease) },
      () => {
        if (onComplete) {
          runOnJS(onComplete)();
        }
      },
    );
  };

  const slideIn = () => {
    translateY.value = withTiming(0, {
      duration: SLIDE_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  };

  const fadeOut = (onComplete?: () => void) => {
    opacity.value = withTiming(0, { duration: FADE_DURATION }, () => {
      if (onComplete) {
        runOnJS(onComplete)();
      }
    });
  };

  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: FADE_DURATION });
  };

  const scheduleHide = () => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      slideOut(() => {
        setShouldRender(false);
        hideToast();
      });
    }, TOAST_DISPLAY_DURATION);
  };

  // 토스트 플로우 (최신 ver)
  // 최초 - slide-in & out
  // 연속 - fade-in & out
  useEffect(() => {
    if (visible) {
      const isNewMessage = previousMessageRef.current !== message;
      const isAlreadyVisible = shouldRender;

      if (isAlreadyVisible && isNewMessage) {
        clearHideTimer();
        fadeOut(() => {
          setDisplayMessage(message);
          previousMessageRef.current = message;

          setTimeout(() => {
            fadeIn();
            scheduleHide();
          }, 50);
        });
      } else if (!isAlreadyVisible) {
        setDisplayMessage(message);
        previousMessageRef.current = message;

        translateY.value = 100;
        opacity.value = 1;

        requestAnimationFrame(() => {
          setShouldRender(true);
          requestAnimationFrame(() => {
            slideIn();
            scheduleHide();
          });
        });
      }
    } else {
      clearHideTimer();
      if (shouldRender) {
        slideOut(() => {
          setShouldRender(false);
          previousMessageRef.current = '';
        });
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
    <Modal transparent animationType="none" visible>
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
          className="w-[288px] items-center justify-center rounded-xl"
          style={{ height }}>
          <Text className="text-center text-white body-rg-02">
            {displayMessage}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

export default Toast;
