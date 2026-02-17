import React, { ReactNode } from 'react';

import { View } from 'react-native';

import FunctionButton from '../../atoms/Button/FunctionButton';

import FloatingAddButton from '@/feature/picsel/shared/components/ui/atoms/Button/AddButton';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/Button/UpButton';

interface FloatingActionButtonsProps {
  isSelecting: boolean;
  showUpButton: boolean;
  showFunctionButtons: boolean;
  onScrollToTop: () => void;
  onToggleFunctionButtons: () => void;
  onAlbumPress: () => void;
  onQrPress: () => void;
  onCloseFunctionButtons: () => void;
  tooltip?: ReactNode;
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
  tooltip,
}: FloatingActionButtonsProps) => {
  if (isSelecting) {
    return null;
  }

  return (
    <View className="absolute bottom-3 right-4 items-end">
      {!showFunctionButtons && tooltip}
      {showUpButton && (
        <View className="mb-4">
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
