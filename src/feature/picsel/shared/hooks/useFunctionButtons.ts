import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

interface UseFunctionButtonsReturn {
  showFunctionButtons: boolean;
  toggleFunctionButtons: () => void;
  handleAlbumPress: () => void;
  handleQrPress: () => void;
  closeFunctionButtons: () => void;
}

export const useFunctionButtons = (): UseFunctionButtonsReturn => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [showFunctionButtons, setShowFunctionButtons] = useState(false);

  const toggleFunctionButtons = () => {
    setShowFunctionButtons(!showFunctionButtons);
  };

  const handleAlbumPress = () => {
    setShowFunctionButtons(false);
    navigation.navigate('SelectPhoto', { variant: 'main' });
  };

  const handleQrPress = () => {
    setShowFunctionButtons(false);
    navigation.navigate('QrScan');
  };

  const closeFunctionButtons = () => {
    setShowFunctionButtons(false);
  };

  return {
    showFunctionButtons,
    toggleFunctionButtons,
    handleAlbumPress,
    handleQrPress,
    closeFunctionButtons,
  };
};
