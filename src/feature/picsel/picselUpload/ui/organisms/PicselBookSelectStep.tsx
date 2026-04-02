import React from 'react';

import { Text, View } from 'react-native';

import { STEP_TEXTS } from '../../constants/stepTexts';
import { usePicselUploadStore } from '../../hooks/usePicselUploadStore';

import PicselBookList from '@/feature/picsel/picselBook/components/ui/organisms/PicselBookList';
import { usePicselBook } from '@/feature/picsel/picselBook/hooks/usePicselBook';
import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import Button from '@/shared/ui/atoms/Button';

interface Props {
  onNext: (bookId: string, bookName: string) => void;
}

const PicselBookSelectStep = ({ onNext }: Props) => {
  const {
    books,
    selectedBookIds,
    handleBookPress,
    isLoading,
    handleAddBook,
    picselBookRef,
    handleSubmit,
  } = usePicselBook();

  const setPicselbookId = usePicselUploadStore(state => state.setPicselbookId);

  const isNextEnabled = selectedBookIds.length > 0;

  const handleNextPress = () => {
    const selectedId = selectedBookIds[0];
    const targetBook = books.find(b => b.picselbookId === selectedId);

    if (targetBook) {
      if (targetBook) {
        setPicselbookId(targetBook.picselbookId, targetBook.bookName);

        onNext(targetBook.picselbookId, targetBook.bookName);
      }
    }
  };

  return (
    <View className="flex-1">
      <UploadStepHeader
        title={
          <>
            보관할 <Text className="text-pink-500 title-02">픽셀북</Text>을{' '}
            선택해주세요
          </>
        }
        description={STEP_TEXTS.PICSEL_BOOK_SELECT.DESCRIPTION}
      />
      <View className="flex-1 pt-6">
        <Text className="px-5 text-gray-900 headline-02">픽셀북 선택</Text>

        <View className="flex-1 py-6">
          <PicselBookList
            books={books}
            isSelecting={true}
            isUploadStep={true}
            selectedBookIds={selectedBookIds}
            onBookPress={(id, name) => handleBookPress(id, name, true)}
            isLoading={isLoading}
            onAddBook={handleAddBook}
          />
          <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />
        </View>
      </View>

      <View className="absolute bottom-[-5px] w-full items-center">
        <Button
          text="다음"
          color={isNextEnabled ? 'active' : 'disabled'}
          textColor="white"
          disabled={!isNextEnabled}
          onPress={handleNextPress}
        />
      </View>
    </View>
  );
};

export default PicselBookSelectStep;
