import React from 'react';

import { View } from 'react-native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';

import AddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';

const PicselBookTemplate = () => {
  const { handleAddPicsel, handleAddBook } = usePicselBookActions();

  return (
    <EmptyStateLayout floatingButton={<AddButton onPress={handleAddPicsel} />}>
      <View className="flex-1">
        <AddBookButton onPress={handleAddBook} />
        <EmptyMessage
          message="네컷사진을 모아두는 나만의 앨범,픽셀북을 추가해보세요!"
          breakAtComma
        />
      </View>
    </EmptyStateLayout>
  );
};

export default PicselBookTemplate;
