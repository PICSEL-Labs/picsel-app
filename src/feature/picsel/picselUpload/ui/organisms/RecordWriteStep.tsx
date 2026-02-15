import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { usePicselUploadStore } from '../../hooks/usePicselUploadStore';
import { useAddPicselToPicselBook } from '../../mutations/useAddPicselToPicselBook';

import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';
import Button from '@/shared/ui/atoms/Button';

const RecordWriteStep = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    title: savedTitle,
    content: savedContent,
    takenDate,
    storeId,
    picselbookId,
    bookName,
    setRecord,
    getImagePaths,
    resetUploadData,
  } = usePicselUploadStore();
  const { reset: resetPhotoStore } = usePhotoStore();

  const [title, setTitle] = useState(savedTitle || '');
  const [content, setContent] = useState(savedContent || '');

  // 픽셀 업로드 mutation
  const { mutate: uploadPicsel, isPending } = useAddPicselToPicselBook();

  const handleComplete = () => {
    const requestPayload = {
      picselbookId,
      storeId,
      takenDate,
      title,
      content,
      imagePaths: getImagePaths(),
    };

    uploadPicsel(requestPayload, {
      onSuccess: data => {
        navigation.reset({
          index: 1,
          routes: [
            {
              name: 'PicselBookFolder',
              params: { bookId: picselbookId, bookName: bookName },
            },
            { name: 'PicselDetail', params: { picselId: data.data.picselId } },
          ],
        });

        setRecord(title, content);
        resetUploadData();
        resetPhotoStore();
      },
      onError: error => {
        console.log('픽셀 업로드 중 에러 발생:', error.message);
      },
    });
  };

  const isFilled = title.trim().length > 0 && content.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding' })}
      className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        bounces={false}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        className="flex-1">
        <UploadStepHeader
          title={
            <>
              추억을 <Text className="text-pink-500 title-02">글</Text>로
              기록해보세요
            </>
          }
          description={'사진과 함께 이 날의 이야기를 간단히 남겨보세요!'}
        />

        <View className="px-5 pt-6">
          <Text className="mb-3 text-gray-900 headline-02">내용</Text>

          {/* 입력 컨테이너 */}
          <View className="min-h-[300px] rounded-xl border border-gray-300 p-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="✏️ 제목 입력"
              placeholderTextColor="#7E8392"
              className="mb-2 font-nanum-square-ac-regular text-primary-black headline-02"
              maxLength={20}
              returnKeyType="next"
              style={{ lineHeight: 20 }}
              selectionColor="#FF6C9A"
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder={
                '사진과 관련된 에피소드를 자유롭게 작성하여\n이날의 추억을 글로 기록해보아요:)'
              }
              placeholderTextColor="#7E8392"
              multiline
              scrollEnabled
              textAlignVertical="top"
              className="font-nanum-square-ac-regular text-gray-900"
              style={{ minHeight: 180, lineHeight: 22 }}
              selectionColor="#FF6C9A"
            />
          </View>
        </View>
      </ScrollView>
      <View className="w-full items-center">
        <Button
          text="완료"
          color={isFilled ? 'active' : 'disabled'}
          textColor="white"
          disabled={!isFilled || isPending}
          onPress={handleComplete}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RecordWriteStep;
