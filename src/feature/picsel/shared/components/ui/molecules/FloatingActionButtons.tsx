import React from 'react';

import { View } from 'react-native';

import FunctionButton from '../atoms/FunctionButton';

import FloatingAddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/UpButton';

interface FloatingActionButtonsProps {
  isSelecting: boolean;
  showUpButton: boolean;
  showFunctionButtons: boolean;
  onScrollToTop: () => void;
  onToggleFunctionButtons: () => void;
  onAlbumPress: () => void;
  onQrPress: () => void;
  onCloseFunctionButtons: () => void;
}

const FloatingActionButtons = ({
  isSelecting,
  showUpButton,
  showFunctionButtons,
  onScrollToTop,
  onToggleFunctionButtons,
  onAlbumPress,
  onQrPress,
  onCloseFunctionButtons,
}: FloatingActionButtonsProps) => {
  if (isSelecting) {
    return null;
  }

  return (
    <View className="absolute bottom-11 right-4">
      {showUpButton && (
        <View className="mb-14">
          <UpButton onPress={onScrollToTop} />
        </View>
      )}
      {showFunctionButtons ? (
        <FunctionButton
          onAlbumPress={onAlbumPress}
          onQrPress={onQrPress}
          onClose={onCloseFunctionButtons}
        />
      ) : (
        <FloatingAddButton onPress={onToggleFunctionButtons} />
      )}
    </View>
  );
};

export default FloatingActionButtons;
