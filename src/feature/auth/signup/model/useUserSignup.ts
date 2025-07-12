import { SetStateAction, useCallback } from 'react';

import { signupApi } from '../api/signupApi';

import { SignupNavigationProp } from '@/shared/types/navigateTypeUtil';

interface Props {
  socialAccessToken: string;
  userSocialType: string;
  userNickname: string;
  checkedStates: boolean[];
  setIsTermsOpen: (value: SetStateAction<boolean>) => void;
  navigation: SignupNavigationProp;
}

export const useUserSignup = ({
  socialAccessToken,
  userSocialType,
  userNickname,
  checkedStates,
  setIsTermsOpen,
  navigation,
}: Props) => {
  const handleSignup = useCallback(async () => {
    try {
      await signupApi({
        socialAccessToken,
        socialType: userSocialType,
        userNickname,
        userAgreementConsentRequestDto: {
          ageConsent: checkedStates[0],
          termsOfService: checkedStates[1],
          privacyPolicy: checkedStates[2],
          locationConsent: checkedStates[3],
          marketingConsent: checkedStates[4],
        },
      });

      setIsTermsOpen(false);
      navigation.navigate('SelectBrand');
    } catch (err) {
      console.log(err);
    }
  }, [
    socialAccessToken,
    userSocialType,
    userNickname,
    checkedStates,
    setIsTermsOpen,
    navigation,
  ]);

  return { handleSignup };
};
