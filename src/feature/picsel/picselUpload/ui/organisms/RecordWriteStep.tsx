import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  CONTENT_INPUT_STYLE,
  INPUT_COLORS,
  TITLE_INPUT_STYLE,
} from '../../constants/styles/input';
import { useCompletePicselUpload } from '../../hooks/useCompletePicselUpload';
import { usePicselUploadStore } from '../../hooks/usePicselUploadStore';

import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import Button from '@/shared/ui/atoms/Button';

const RecordWriteStep = () => {
  const { title: savedTitle, content: savedContent } = usePicselUploadStore();

  const [title, setTitle] = useState(savedTitle || '');
  const [content, setContent] = useState(savedContent || '');

  const { complete, isPending } = useCompletePicselUpload();

  const isFilled = title.trim().length > 0 && content.trim().length > 0;

  const handleComplete = () => complete({ title, content });

  return (
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

        <View className="px-5 pt-6">
          <Text className="mb-3 text-gray-900 headline-02">내용</Text>

          <View className="min-h-[300px] gap-2 rounded-xl border border-gray-300 p-2">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="✏️ 제목 입력"
              placeholderTextColor={INPUT_COLORS.placeholder}
              selectionColor={INPUT_COLORS.selection}
              className={TITLE_INPUT_STYLE}
              maxLength={20}
              returnKeyType="next"
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder={
                '사진과 관련된 에피소드를 자유롭게 작성하여\n이날의 추억을 글로 기록해보아요:)'
              }
              placeholderTextColor={INPUT_COLORS.placeholder}
              selectionColor={INPUT_COLORS.selection}
              multiline
              scrollEnabled
              className={CONTENT_INPUT_STYLE}
            />
          </View>
        </View>
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
  );
};

export default RecordWriteStep;
