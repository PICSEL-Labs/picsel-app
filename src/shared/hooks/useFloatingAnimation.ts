import { useRef, useEffect } from 'react';

import { Animated } from 'react-native';

interface Props {
  toValue?: number;
  duration1?: number;
  duration2?: number;
  easing?: (value: number) => number;
  iterations?: number;
}

export const useFloatingAnimation = (config: Props) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: config.toValue,
          duration: config.duration1,
          useNativeDriver: true,
          easing: config.easing,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: config.duration2,
          useNativeDriver: true,
          easing: config.easing,
        }),
      ]),
      { iterations: config.iterations },
    );

    animationRef.current.start();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [
    config.toValue,
    config.duration1,
    config.duration2,
    config.easing,
    config.iterations,
  ]);

  return translateY;
};
