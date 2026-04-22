import React from 'react';

import { Text, TextInput, View } from 'react-native';

import {
  CONTENT_INPUT_STYLE,
  INPUT_COLORS,
  TITLE_INPUT_STYLE,
} from '@/feature/picsel/picselUpload/constants/styles/input';

interface Props {
  title: string;
  content: string;
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
  onFocus?: () => void;
}

const ContentInput = ({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onFocus,
}: Props) => {
  return (
    <View className="gap-3 px-5 pt-6">
      <Text className="text-gray-900 headline-02">내용</Text>
      <View className="h-[300px] gap-2 rounded-xl border border-gray-300 p-2">
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          onFocus={onFocus}
          placeholder="✏️ 제목 입력"
          placeholderTextColor={INPUT_COLORS.placeholder}
          selectionColor={INPUT_COLORS.selection}
          className={TITLE_INPUT_STYLE}
          maxLength={20}
          returnKeyType="next"
        />
        <TextInput
          value={content}
          onChangeText={onChangeContent}
          onFocus={onFocus}
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
  );
};

export default ContentInput;
