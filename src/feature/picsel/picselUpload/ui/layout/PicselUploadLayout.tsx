import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useConfirmExit } from '../../hooks/useConfirmExit';

import PicselUploadHeader from './PicselUploadHeader';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

interface Props {
  children: React.ReactNode;
}

const PicselUploadLayout = ({ children }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { confirmExitUpload } = useConfirmExit();

  return (
    <ScreenLayout>
      <PicselUploadHeader
        onBack={() => navigation.goBack()}
        onClose={confirmExitUpload}
      />
      {children}
    </ScreenLayout>
  );
};

export default PicselUploadLayout;
