import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useButtonService } from '@/feature/auth/signup/model/useButtonService';
import { useNicknameValidation } from '@/feature/auth/signup/model/useNicknameValidation';
import { useTermsAgreement } from '@/feature/auth/signup/model/useTermsAgreement';
import { useUserSignup } from '@/feature/auth/signup/model/useUserSignup';
import { TermsModal } from '@/feature/auth/signup/ui/modal';
import NicknameFeedback from '@/feature/auth/signup/ui/organisms/NicknameFeedback';
import NicknameInput from '@/feature/auth/signup/ui/organisms/NicknameInput';
import NicknameSubmitButton from '@/feature/auth/signup/ui/organisms/NicknameSubmitButton';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useUserStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';
import SignupHeader from '@/shared/ui/organisms/SignupHeader';
import SignupIntro from '@/shared/ui/organisms/SignupIntro';

const NicknameInputScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();

  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const { userSocialType, socialAccessToken } = useUserStore();

  const {
    errorMessage,
    isAvailable,
    focus,
    handleBlur,
    handleClear,
    handleNicknameChange,
    setFocus,
    userNickname,
  } = useNicknameValidation();

  const {
    checkedStates,
    setCheckedStates,
    allChecked,
    isRequiredAllChecked,
    toggleAll,
    toggleItem,
  } = useTermsAgreement();

  const { handleSignup } = useUserSignup({
    checkedStates,
    socialAccessToken,
    userSocialType,
    userNickname,
    navigation,
    setIsTermsOpen,
  });

  const { keyboardHeight } = useButtonService({ focus });

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        className="flex-1">
        <SignupHeader text="회원가입" />

        <SignupIntro
          title={'지금부터 당신은 [픽셀러]\n닉네임을 정해주세요'}
          sub="2-12자 이내로 작성해주세요"
          icon
        />

        <NicknameInput
          handleBlur={handleBlur}
          handleChange={handleNicknameChange}
          handleClear={handleClear}
          setFocus={setFocus}
          userNickname={userNickname}>
          <NicknameFeedback
            errorMessage={errorMessage}
            isAvailable={isAvailable}
            length={userNickname.length}
          />
        </NicknameInput>

        <NicknameSubmitButton
          focus={focus}
          isAvailable={isAvailable}
          keyboardHeight={keyboardHeight}
          setIsTermsOpen={setIsTermsOpen}
        />
      </KeyboardAvoidingView>

      <TermsModal
        checkedStates={checkedStates}
        setCheckedStates={setCheckedStates}
        handleSignup={handleSignup}
        visible={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        toggleAll={toggleAll}
        allChecked={allChecked}
        isRequiredAllChecked={isRequiredAllChecked}
        toggleItem={toggleItem}
        title="이용약관 동의"
      />
    </ScreenLayout>
  );
};

export default NicknameInputScreen;
