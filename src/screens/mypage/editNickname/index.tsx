import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, View, Text } from 'react-native';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { HighlightedText } from '@/shared/components/HighlightedText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import {
  NicknameInput,
  NicknameFeedback,
  NicknameEditButton,
  useNicknameValidation,
  useKeyboardHeight,
  updateNicknameApi,
} from '@/shared/nickname';
import { useUserStore } from '@/shared/store';

const EditNicknameScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    userNickname: currentNickname,
    setUserNickname,
    setEmail,
  } = useUserStore();
  const nicknameValidation = useNicknameValidation();
  const { keyboardHeight } = useKeyboardHeight();

  const isSameAsCurrentNickname =
    nicknameValidation.userNickname === currentNickname;

  const errorMessage = isSameAsCurrentNickname
    ? '현재 닉네임과 동일한 닉네임이에요'
    : nicknameValidation.errorMessage;

  const handleSubmit = async () => {
    if (!nicknameValidation.isAvailable || isSameAsCurrentNickname) {
      return;
    }

    try {
      const response = await updateNicknameApi(nicknameValidation.userNickname);

      setUserNickname(response.data.userNickname);
      setEmail(response.data.email);

      navigation.navigate('Mypage', {
        toastMessage: '닉네임 변경을 완료했어요',
      });
    } catch (error) {
      navigation.navigate('Mypage', {
        toastMessage: '닉네임 변경에 실패했어요',
      });
    }
  };

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
            isAvailable={
              nicknameValidation.isAvailable && !isSameAsCurrentNickname
            }
            length={nicknameValidation.userNickname.length}
          />
        </NicknameInput>

        <NicknameEditButton
          focus={nicknameValidation.focus}
          isAvailable={
            nicknameValidation.isAvailable && !isSameAsCurrentNickname
          }
          keyboardHeight={keyboardHeight}
          onSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default EditNicknameScreen;
