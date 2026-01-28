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

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack(); // 없으면 기본 내비게이션 뒤로 가기
    }
  };

  return (
    <ScreenLayout>
      <PicselUploadHeader onBack={handleBack} onClose={confirmExitUpload} />
      {children}
    </ScreenLayout>
  );
};

export default PicselUploadLayout;
