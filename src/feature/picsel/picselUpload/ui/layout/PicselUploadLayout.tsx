import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useConfirmExit } from '../../hooks/useConfirmExit';

import PicselUploadHeader from './PicselUploadHeader';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

interface Props {
  children: React.ReactNode;
  onBack?: () => void;
}

const PicselUploadLayout = ({ children, onBack }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { confirmExitUpload } = useConfirmExit();

  const navigateToExit = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const handleClose = () => {
    confirmExitUpload(navigateToExit);
  };

  return (
    <ScreenLayout>
      <PicselUploadHeader onBack={handleBack} onClose={handleClose} />
      {children}
    </ScreenLayout>
  );
};

export default PicselUploadLayout;
