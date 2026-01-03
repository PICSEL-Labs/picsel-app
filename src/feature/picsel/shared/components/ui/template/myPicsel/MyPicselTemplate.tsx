import React from 'react';

import FloatingAddButton from '../../atoms/FloatingAddButton';
import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';
import UploadTooltip from '../../molecule/UploadTooltip';

import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';

const MyPicselTemplate = () => {
  const { handleAddPicsel } = usePicselBookActions();

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
