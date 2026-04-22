import React, { useEffect } from 'react';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 40;
const STROKE_WIDTH = 4;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TOTAL_ARC_RATIO = 0.78;
const SEGMENTS = 14;
const SEGMENT_DEGREES = (TOTAL_ARC_RATIO * 360) / SEGMENTS;
const SEGMENT_LENGTH = CIRCUMFERENCE * (TOTAL_ARC_RATIO / SEGMENTS) * 1.1;

const GradientSpinner = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <Animated.View style={[{ width: SIZE, height: SIZE }, animatedStyle]}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <Circle
            key={i}
            cx={cx}
            cy={cy}
            r={RADIUS}
            stroke="#FF6C9A"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${SEGMENT_LENGTH} ${CIRCUMFERENCE}`}
            strokeLinecap="butt"
            strokeOpacity={(i + 1) / SEGMENTS}
            transform={`rotate(${-90 + i * SEGMENT_DEGREES}, ${cx}, ${cy})`}
          />
        ))}
      </Svg>
    </Animated.View>
  );
};

export default GradientSpinner;
