import React, { useEffect, useState } from 'react';

import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useToastStore } from '@/shared/store/ui/toast';

const GRADIENT_COLORS = [
  'rgba(255, 255, 255, 1)',
  'rgba(17, 17, 20, 0.8)',
  'rgba(17, 17, 20, 1)',
  'rgba(17, 17, 20, 0.8)',
  'rgba(255, 255, 255, 1)',
] as string[];

const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.95, 1] as number[];

interface Props {
  bottomAreaHeight: SharedValue<number>;
}

const Toast = ({ bottomAreaHeight }: Props) => {
  const { message, visible, hideToast, marginBottom } = useToastStore();
  const animatedBottom = useSharedValue(-100);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      const height = bottomAreaHeight.value > 0 ? bottomAreaHeight.value : 72;

      animatedBottom.value = withTiming(height + marginBottom, {
        duration: 300,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      });

      const timer = setTimeout(() => {
        animatedBottom.value = withTiming(
          -height - 50,
          {
            duration: 300,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
          () => {
            runOnJS(hideToast)();
            runOnJS(setShouldRender)(false);
          },
        );
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [visible, marginBottom]);

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: animatedBottom.value,
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
        <Text className="text-center text-white body-rg-02">{message}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default Toast;
