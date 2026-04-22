import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useConfirmExit } from '../../hooks/useConfirmExit';

import PicselUploadHeader from './PicselUploadHeader';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useMyPicselStore } from '@/shared/store/myPicsel';

interface Props {
  children: React.ReactNode;
  onBack?: () => void;
}

const PicselUploadLayout = ({ children, onBack }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { confirmExitUpload } = useConfirmExit();
  const { setActiveTab } = useMyPicselStore();

  const navigateToExit = () => {
    setActiveTab('my');
    navigation.navigate('Home', { screen: 'BookScreen' });
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
