import { useCallback, useMemo } from 'react';

import { signupApi } from '../api/signupApi';

import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';

interface Props {
  socialAccessToken: string;
  userSocialType: string;
  userNickname: string;
  checkedStates: boolean[];
  closeModal: () => void;
  navigation: SignupNavigationProp;
}

export const useUserSignup = ({
  socialAccessToken,
  userSocialType,
  userNickname,
  checkedStates,
  closeModal,
  navigation,
}: Props) => {
  const agreementData = useMemo(
    () => ({
      ageConsent: checkedStates[0],
      termsOfService: checkedStates[1],
      privacyPolicy: checkedStates[2],
      locationConsent: checkedStates[3],
      marketingConsent: checkedStates[4],
    }),
    [checkedStates],
  );

  const handleSignup = useCallback(async () => {
    try {
      await signupApi({
        socialAccessToken,
        socialType: userSocialType,
        userNickname,
        userAgreementConsentRequestDto: agreementData,
      });

      closeModal();
      navigation.navigate('SelectBrand');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  }, [
    socialAccessToken,
    userSocialType,
    userNickname,
    agreementData,
    closeModal,
    navigation,
  ]);

  return { handleSignup };
};
