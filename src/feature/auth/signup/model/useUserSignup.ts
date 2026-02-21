import { useMemo } from 'react';

import { signupApi } from '../api/signupApi';

import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useUserStore } from '@/shared/store';

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
  const { setAccessToken, setSocialAccessToken } = useUserStore();

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

  const saveTokens = (accessToken: string) => {
    setAccessToken(accessToken);
    setSocialAccessToken(null);
  };

  const navigateToSelectBrand = (refreshToken: string) => {
    navigation.navigate('SelectBrand', {
      marketingConsent: agreementData.marketingConsent,
      refreshToken,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await signupApi({
        socialAccessToken,
        socialType: userSocialType,
        userNickname,
        userAgreementConsentRequestDto: agreementData,
      });

      saveTokens(response.accessToken);
      closeModal();
      navigateToSelectBrand(response.refreshToken);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return { handleSignup };
};
