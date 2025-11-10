import React, { useEffect, useState } from 'react';

import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/shared/store/ui/toast';

const GRADIENT_COLORS = [
  'rgba(255, 255, 255, 1)',
  'rgba(17, 17, 20, 0.8)',
  'rgba(17, 17, 20, 1)',
  'rgba(17, 17, 20, 0.8)',
  'rgba(255, 255, 255, 1)',
] as string[];

const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.95, 1] as number[];

const TOAST_DURATION = 1500;

const Toast = () => {
  const { message, visible, hideToast, marginBottom, timerId, setTimerId } =
    useToastStore();
  const animatedBottom = useSharedValue(-100);
  const animatedOpacity = useSharedValue(1);
  const [shouldRender, setShouldRender] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setShouldRender(true);

      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }

      const baseBottom = insets.bottom + (marginBottom ?? 48);

      // 바로 메시지가 변경된 경우 자연스러운 인터렉션 추가
      if (displayMessage && displayMessage !== message) {
        animatedOpacity.value = withSequence(
          withTiming(0.5, { duration: 100 }),
          withTiming(1, { duration: 100 }),
        );
      }

      setDisplayMessage(message);

      if (animatedBottom.value < 0) {
        animatedBottom.value = withTiming(baseBottom, {
          duration: 300,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
        });
      }

      const timer = setTimeout(() => {
        animatedBottom.value = withTiming(
          -100,
          {
            duration: 300,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
          () => {
            runOnJS(hideToast)();
            runOnJS(setShouldRender)(false);
            runOnJS(setTimerId)(null);
            runOnJS(setDisplayMessage)('');
          },
        );
      }, TOAST_DURATION);

      setTimerId(timer);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [visible, message, marginBottom, insets.bottom]);

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: animatedBottom.value,
    opacity: animatedOpacity.value,
  }));

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute z-50 w-full items-center">
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
