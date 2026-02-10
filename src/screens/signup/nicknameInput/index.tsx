import React from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { useSignupFlow } from '@/feature/auth/signup/model/useSignupFlow';
import { TermsBottomSheet } from '@/feature/auth/signup/ui/modal';
import NicknameSubmitButton from '@/feature/auth/signup/ui/organisms/NicknameSubmitButton';
import SignupHeader from '@/feature/auth/signup/ui/organisms/SignupHeader';
import SignupIntro from '@/feature/auth/signup/ui/organisms/SignupIntro';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { NicknameInput, NicknameFeedback } from '@/shared/nickname';

const NicknameInputScreen = () => {
  const {
    isModalOpen,
    openModal,
    closeModal,
    nicknameValidation,
    termsAgreement,
    keyboardHeight,
    handleSignup,
  } = useSignupFlow();

  const termsState = {
    setCheckedStates: termsAgreement.setCheckedStates,
    checkedStates: termsAgreement.checkedStates,
    allChecked: termsAgreement.allChecked,
    isRequiredAllChecked: termsAgreement.isRequiredAllChecked,
  };

  const termsActions = {
    toggleAll: termsAgreement.toggleAll,
    toggleItem: termsAgreement.toggleItem,
  };

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
          handleBlur={nicknameValidation.handleBlur}
          handleChange={nicknameValidation.handleNicknameChange}
          handleClear={nicknameValidation.handleClear}
          setFocus={nicknameValidation.setFocus}
          errorMessage={nicknameValidation.errorMessage}
          userNickname={nicknameValidation.userNickname}>
          <NicknameFeedback
            errorMessage={nicknameValidation.errorMessage}
            isAvailable={nicknameValidation.isAvailable}
            length={nicknameValidation.userNickname.length}
          />
        </NicknameInput>

        <NicknameSubmitButton
          focus={nicknameValidation.focus}
          isAvailable={nicknameValidation.isAvailable}
          keyboardHeight={keyboardHeight}
          setIsTermsOpen={openModal}
        />
      </KeyboardAvoidingView>

      <TermsBottomSheet
        visible={isModalOpen}
        onClose={closeModal}
        onSignup={handleSignup}
        termsState={termsState}
        termsActions={termsActions}
      />
    </ScreenLayout>
  );
};

export default NicknameInputScreen;
