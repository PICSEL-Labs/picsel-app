import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';

import FloatingAddButton from '@/feature/picsel/shared/components/ui/atoms/FloatingAddButton';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const PicselBookTemplate = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleAddPicsel = () => {
    navigation.navigate('PhotoUpload');
  };

  const handleAddBook = () => {
    console.log('북 클릭');
  };

  return (
    <EmptyStateLayout
      floatingButton={<FloatingAddButton onPress={handleAddPicsel} />}>
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
