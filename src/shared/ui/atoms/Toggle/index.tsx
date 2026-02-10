import React from 'react';

import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const TOGGLE_WIDTH = 51;
const TOGGLE_HEIGHT = 31;
const THUMB_SIZE = 27;
const THUMB_MARGIN = 2;

const Toggle = ({ value, onValueChange, disabled = false }: Props) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        interpolateColor(value ? 1 : 0, [0, 1], ['#E5E6E9', '#FF6C9A']),
        { duration: 200 },
      ),
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            value ? TOGGLE_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2 : 0,
            { duration: 200 },
          ),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}>
      <Animated.View
        style={[
          {
            width: TOGGLE_WIDTH,
            height: TOGGLE_HEIGHT,
            borderRadius: TOGGLE_HEIGHT / 2,
            padding: THUMB_MARGIN,
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          },
          animatedContainerStyle,
        ]}>
        <Animated.View
          style={[
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: '#FFFFFF',
            },
            animatedThumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Toggle;
