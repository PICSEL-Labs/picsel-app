import React, { useEffect } from 'react';

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

import { useToastStore } from '@/shared/store/ui/Toast';

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

const BrandFilterToast = ({ bottomAreaHeight }: Props) => {
  const { message, visible, hideToast } = useToastStore();
  const animatedBottom = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      const height = bottomAreaHeight.value > 0 ? bottomAreaHeight.value : 72;

      animatedBottom.value = withTiming(height + 12, {
        duration: 300,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      });

      const timer = setTimeout(() => {
        animatedBottom.value = withTiming(
          -height,
          {
            duration: 300,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          },
          () => {
            runOnJS(hideToast)();
          },
        );
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: animatedBottom.value,
    };
  });

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute z-50 w-full items-center">
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={GRADIENT_LOCATIONS} // 각 색상의 위치를 비율(0~1)로 지정
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="h-[40px] w-[288px] items-center justify-center rounded-xl">
        <Text className="text-center text-white body-rg-02">{message}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default BrandFilterToast;
