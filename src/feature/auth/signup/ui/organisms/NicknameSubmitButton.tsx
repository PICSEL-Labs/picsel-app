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
  setIsTermsOpen: (value: React.SetStateAction<boolean>) => void;
}

const NicknameSubmitButton = ({
  focus,
  keyboardHeight,
  isAvailable,
  setIsTermsOpen,
}: Props) => {
  const insets = useSafeAreaInsets();

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
          onPressIn={
            focus ? () => Keyboard.dismiss() : () => setIsTermsOpen(true)
          }
          disabled={focus ? false : !isAvailable}
          text={focus ? '확인' : '다음'}
          textColor="white"
          color={isAvailable || focus ? 'active' : 'disabled'}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default NicknameSubmitButton;
