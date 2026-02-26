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
    navigation.navigate('SelectMainPhoto');
    setTimeout(() => setShowFunctionButtons(false), 300);
  };

  const handleQrPress = () => {
    navigation.navigate('QrScan');
    setTimeout(() => setShowFunctionButtons(false), 300);
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
