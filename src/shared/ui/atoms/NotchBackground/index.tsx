import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  color?: string;
}

const NotchBackground = ({ color }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insets.top,
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
      }}
    />
  );
};

export default NotchBackground;
