import React from 'react';

import { View } from 'react-native';

import Floating from './Floating';

import Button from '@/shared/ui/atoms/Button';

interface Props {
  disabled: boolean;
  actualSelectedCount: number;
  handleSelectedCompleted: () => Promise<void>;
  showFloatingButton: boolean;
  scrollToTop: () => void;
  handleNavigation: () => void;
}

const SelectButton = ({
  disabled,
  actualSelectedCount,
  handleSelectedCompleted,
  handleNavigation,
  showFloatingButton,
  scrollToTop,
}: Props) => {
  return (
    <View className="absolute bottom-10 w-full items-center">
      <Button
        color={!disabled ? 'disabled' : 'active'}
        textColor="white"
        text={`선택 완료 (${actualSelectedCount})`}
        disabled={!disabled}
        onPressIn={
          actualSelectedCount ? handleSelectedCompleted : handleNavigation
        }
      />

      {showFloatingButton && <Floating scrollToTop={scrollToTop} />}
    </View>
  );
};

export default SelectButton;
