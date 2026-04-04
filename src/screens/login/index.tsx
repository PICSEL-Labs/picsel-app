import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useLoginService } from '@/feature/auth/login/model/loginService';
import { SocialTypes } from '@/feature/auth/login/types';
import LoginIntro from '@/feature/auth/login/ui/organisms/LoginIntro';
import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useConfirmModalStore } from '@/shared/store/ui/confirmModal';
import { useUserStore } from '@/shared/store/user';
import SocialLoginButton from '@/shared/ui/molecules/SocialLoginButton';

const LoginScreen = () => {
  const navigation = useNavigation<SignupNavigationProp>();
  const { handleSocialLogin } = useLoginService(navigation);
  const { isWithdrawn, setIsWithdrawn } = useUserStore();

  useEffect(() => {
    if (isWithdrawn) {
      useConfirmModalStore.getState().showConfirmModal({
        title: '잠시만 기다려 주세요',
        message:
          '아직 회원 탈퇴 처리 중이에요🥹\n다음 날 새벽 2시 이후 재가입이 가능해요.',
        confirmText: '확인',
        isSingleButton: true,
        onConfirm: () => setIsWithdrawn(false),
      });
    }
  }, [isWithdrawn, setIsWithdrawn]);

  return (
    <ScreenLayout className="bg-primary-black">
      <View className="flex-1">
        <LoginIntro />

        <View className="flex-row justify-center pb-20">
          {(['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'] as SocialTypes[]).map(
            type => (
              <SocialLoginButton
                key={type}
                type={type}
                onPressIn={handleSocialLogin}
              />
            ),
          )}
        </View>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;
