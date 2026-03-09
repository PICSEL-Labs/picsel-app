import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useCompletePicselUpload } from '../../hooks/useCompletePicselUpload';
import { usePicselUploadStore } from '../../hooks/usePicselUploadStore';
import UploadLoadingOverlay from '../molecules/UploadLoadingOverlay';

import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import ContentInput from '@/feature/picsel/shared/components/ui/organisms/ContentInput';
import Button from '@/shared/ui/atoms/Button';

const RecordWriteStep = () => {
  const { title: savedTitle, content: savedContent } = usePicselUploadStore();

  const [title, setTitle] = useState(savedTitle || '');
  const [content, setContent] = useState(savedContent || '');

  const { complete, isPending } = useCompletePicselUpload();

  const isFilled = title.trim().length > 0 && content.trim().length > 0;

  const handleComplete = () => complete({ title, content });

  return (
    <>
      {isPending && <UploadLoadingOverlay />}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        className="flex-1">
        <ScrollView
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <UploadStepHeader
            title={
              <>
                추억을 <Text className="text-pink-500 title-02">글</Text>로
                기록해보세요
              </>
            }
            description={'사진과 함께 이 날의 이야기를 간단히 남겨보세요!'}
          />

          <ContentInput
            title={title}
            content={content}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
          />
        </ScrollView>
        <View className="px-4">
          <Button
            className="w-full"
            text="완료"
            color={isFilled ? 'active' : 'disabled'}
            textColor="white"
            disabled={!isFilled || isPending}
            onPress={handleComplete}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RecordWriteStep;
