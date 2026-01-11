import React, { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecules/EmptyMessage';
import PicselBookBottomSheet from '../../organisms/bottomSheet/PicselBookBottomSheet';

import AddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import AddBookButton from '@/feature/picsel/shared/components/ui/organisms/AddBookButton';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';

const PicselBookTemplate = () => {
  const { handleAddPicsel } = usePicselBookActions();
  const picselBookRef = useRef<BottomSheetModal>(null);

  const handleAddBook = () => {
    picselBookRef.current?.present();
  };

  const handleSubmit = (bookName: string) => {
    // TODO: 픽셀북 생성 API 호출
    console.log('픽셀북 생성:', bookName);
  };

  return (
    <EmptyStateLayout floatingButton={<AddButton onPress={handleAddPicsel} />}>
      <View className="flex-1">
        <AddBookButton onPress={handleAddBook} />

        <EmptyMessage
          message="네컷사진을 모아두는 나만의 앨범,픽셀북을 추가해보세요!"
          breakAtComma
        />
      </View>

      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />
    </EmptyStateLayout>
  );
};

export default PicselBookTemplate;
