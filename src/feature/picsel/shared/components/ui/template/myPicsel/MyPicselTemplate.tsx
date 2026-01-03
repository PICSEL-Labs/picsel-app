import React from 'react';

import { useNavigation } from '@react-navigation/native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';
import UploadTooltip from '../../molecule/UploadTooltip';

import FloatingAddButton from '@/feature/picsel/shared/components/ui/atoms/FloatingAddButton';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const MyPicselTemplate = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleAddPicsel = () => {
    navigation.navigate('PhotoUpload');
  };

  return (
    <EmptyStateLayout
      floatingButton={
        <>
          <UploadTooltip />
          <FloatingAddButton onPress={handleAddPicsel} />
        </>
      }>
      <EmptyMessage message="당신의 네컷사진을 올려보세요!" />
    </EmptyStateLayout>
  );
};

export default MyPicselTemplate;
