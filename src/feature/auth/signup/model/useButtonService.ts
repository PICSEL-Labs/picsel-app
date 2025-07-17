import { useEffect, useState } from 'react';

import { Animated, Keyboard } from 'react-native';

interface Props {
  focus: boolean;
}

export const useButtonService = ({ focus }: Props) => {
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [buttonWidth] = useState(new Animated.Value(330));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(buttonWidth, {
      toValue: 330,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [focus]);

  return {
    keyboardHeight,
  };
};
