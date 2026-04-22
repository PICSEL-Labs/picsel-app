import { useNavigation } from '@react-navigation/native';

import { useButtonService } from '@/feature/auth/signup/model/useButtonService';
import { useTermsAgreement } from '@/feature/auth/signup/model/useTermsAgreement';
import { useUserSignup } from '@/feature/auth/signup/model/useUserSignup';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useModal } from '@/shared/hooks/useModal';
import { useNicknameValidation } from '@/shared/nickname';
import { useUserStore } from '@/shared/store';

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
    isModalOpen,
    openModal,
    closeModal,

    nicknameValidation,

    termsAgreement,

    keyboardHeight,

    handleSignup,
  };
};
