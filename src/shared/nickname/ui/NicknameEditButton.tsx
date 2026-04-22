import React from 'react';

import { Animated, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HIT_SIZE } from '@/shared/constants/size';
import { cn } from '@/shared/lib/cn';
import Button from '@/shared/ui/atoms/Button';

interface Props {
  focus: boolean;
  keyboardHeight: Animated.Value;
  isAvailable: boolean | null;
  onSubmit: () => void;
}

const NicknameEditButton = ({
  focus,
  keyboardHeight,
  isAvailable,
  onSubmit,
}: Props) => {
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (focus) {
      Keyboard.dismiss();
    } else {
      onSubmit();
    }
  };

  return (
    <Animated.View
      className={cn(
        `absolute left-0 right-0 items-center bottom-[${Animated.subtract(keyboardHeight, insets.bottom)}px]`,
      )}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: Animated.subtract(keyboardHeight, insets.bottom),
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          marginBottom: focus ? 0 : 40,
        }}>
        <Button
          hitSlop={HIT_SIZE}
          onPressIn={handlePress}
          disabled={focus ? false : !isAvailable}
          text="확인"
          textColor="white"
          color={isAvailable || focus ? 'active' : 'disabled'}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default NicknameEditButton;
