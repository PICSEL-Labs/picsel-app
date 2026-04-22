import React from 'react';

import { KeyboardAvoidingView, Platform, View, Text } from 'react-native';

import { useEditNickname } from '@/feature/mypage/account/hooks/useEditNickname';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { HighlightedText } from '@/shared/components/HighlightedText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import {
  NicknameInput,
  NicknameFeedback,
  NicknameEditButton,
} from '@/shared/nickname';

const EditNicknameScreen = () => {
  const {
    nicknameValidation,
    keyboardHeight,
    errorMessage,
    isSubmittable,
    handleSubmit,
  } = useEditNickname();

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1">
        <MypageHeader title="닉네임 수정" />

        <View className="mx-5 mt-8">
          <View className="flex-row">
            <HighlightedText
              text={'사용중인 닉네임을\n수정할 수 있어요'}
              font="title-05"
              textAlign="text-left"
            />
          </View>
          <Text className="my-4 text-gray-900 body-rg-03">
            2-12자 이내로 작성해주세요
          </Text>
        </View>

        <NicknameInput
          handleBlur={nicknameValidation.handleBlur}
          handleChange={nicknameValidation.handleNicknameChange}
          handleClear={nicknameValidation.handleClear}
          setFocus={nicknameValidation.setFocus}
          errorMessage={errorMessage}
          userNickname={nicknameValidation.userNickname}>
          <NicknameFeedback
            errorMessage={errorMessage}
            isAvailable={isSubmittable}
            length={nicknameValidation.userNickname.length}
          />
        </NicknameInput>

        <NicknameEditButton
          focus={nicknameValidation.focus}
          isAvailable={isSubmittable}
          keyboardHeight={keyboardHeight}
          onSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default EditNicknameScreen;
