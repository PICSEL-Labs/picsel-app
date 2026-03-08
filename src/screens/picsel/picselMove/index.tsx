import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { usePicselMove } from '@/feature/picsel/myPicsel/hooks/usePicselMove';
import PicselBookList from '@/feature/picsel/picselBook/components/ui/organisms/PicselBookList';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import SparkleImages from '@/shared/images/Sparkle';

type Props = NativeStackScreenProps<MainNavigationProps, 'PicselMove'>;

const PicselMoveScreen = ({ route, navigation }: Props) => {
  const { picselId, currentPicselbookId } = route.params;

  const {
    picselBookRef,
    handleAddBook,
    handleSubmit,
    books,
    isLoading,
    isFetching,
    selectedBookId,
    setSelectedBookId,
    isListReady,
    setIsListReady,
    handleMove,
  } = usePicselMove({ picselId, currentPicselbookId, navigation });

  return (
    <ScreenLayout>
      <View className="relative flex-row items-center justify-center py-2">
        <Pressable
          className="absolute left-4"
          onPress={() => navigation.goBack()}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="text-gray-900 title-01">픽셀 이동</Text>
      </View>

      <View className="relative flex-1 items-center justify-center py-6">
        {isListReady && !isFetching && (
          <View className="absolute">
            <SparkleImages shape="bg-opacity" height={418} width={340} />
          </View>
        )}
        <PicselBookList
          books={books}
          isSelecting={true}
          isUploadStep={true}
          selectedBookIds={selectedBookId ? [selectedBookId] : []}
          isLoading={isLoading}
          onBookPress={setSelectedBookId}
          onAddBook={handleAddBook}
          onImagesReady={() => setIsListReady(true)}
        />
      </View>

      <Pressable
        onPress={handleMove}
        className="flex-row items-center justify-center p-3">
        <PicselActionIcons shape="move" width={24} height={24} />
        <Text className="pl-1 text-gray-900 headline-02">사진 옮기기</Text>
      </Pressable>

      <PicselBookBottomSheet ref={picselBookRef} onSubmit={handleSubmit} />
    </ScreenLayout>
  );
};

export default PicselMoveScreen;
