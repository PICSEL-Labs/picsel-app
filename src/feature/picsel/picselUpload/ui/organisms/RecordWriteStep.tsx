import React, { useRef, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { STEP_TEXTS } from '../../constants/stepTexts';
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
  const scrollRef = useRef<ScrollView>(null);

  const handleComplete = () => complete({ title, content });

  return (
    <>
      {isPending && <UploadLoadingOverlay />}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        className="flex-1">
        <ScrollView
          ref={scrollRef}
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
            description={STEP_TEXTS.RECORD_WRITE.DESCRIPTION}
          />

          <ContentInput
            title={title}
            content={content}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
            onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
          />
        </ScrollView>
        <View className="px-4">
          <Button
            className="w-full"
            text="완료"
            color="active"
            textColor="white"
            disabled={isPending}
            onPress={handleComplete}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RecordWriteStep;
