import React from 'react';

import { View } from 'react-native';

import Floating from './Floating';

import Button from '@/shared/ui/atoms/Button';

interface Props {
  disabled: boolean;
  actualSelectedCount: number;
  handleSelectedCompleted?: () => void;
  showFloatingButton?: boolean;
  scrollToTop?: () => void;
  handleNavigation?: () => void;
  onPress?: () => void;
}

const SelectButton = ({
  disabled,
  actualSelectedCount,
  handleSelectedCompleted,
  handleNavigation,
  showFloatingButton,
  scrollToTop,
  onPress,
}: Props) => {
  return (
    <View className="w-full items-center">
      <Button
        color={disabled ? 'disabled' : 'active'}
        textColor="white"
        text={`선택 완료 (${actualSelectedCount})`}
        disabled={disabled}
        onPressIn={
          actualSelectedCount ? handleSelectedCompleted : handleNavigation
        }
        onPress={onPress}
      />

      {showFloatingButton && <Floating scrollToTop={scrollToTop} />}
    </View>
  );
};

export default SelectButton;
