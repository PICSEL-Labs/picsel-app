import { useNavigation } from '@react-navigation/native';

import { useButtonService } from '@/feature/auth/signup/model/useButtonService';
import { useNicknameValidation } from '@/feature/auth/signup/model/useNicknameValidation';
import { useTermsAgreement } from '@/feature/auth/signup/model/useTermsAgreement';
import { useUserSignup } from '@/feature/auth/signup/model/useUserSignup';
import { useModal } from '@/shared/hooks/useModal';
import { useUserStore } from '@/shared/store';
import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';

export const useSignupFlow = () => {
  const navigation = useNavigation<SignupNavigationProp>();
  const { userSocialType, socialAccessToken } = useUserStore();

  const { isModalOpen, openModal, closeModal } = useModal();

  const nicknameValidation = useNicknameValidation();
  const termsAgreement = useTermsAgreement();
  const { keyboardHeight } = useButtonService({
    focus: nicknameValidation.focus,
  });

  const { handleSignup } = useUserSignup({
    checkedStates: termsAgreement.checkedStates,
    socialAccessToken,
    userSocialType,
    userNickname: nicknameValidation.userNickname,
    navigation,
    closeModal,
  });

  return {
    // 모달 상태
    isModalOpen,
    openModal,
    closeModal,

    // 닉네임 관련
    nicknameValidation,

    // 약관 관련
    termsAgreement,

    // UI 관련
    keyboardHeight,

    // 액션
    handleSignup,
  };
};
