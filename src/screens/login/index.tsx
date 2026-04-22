import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

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
  // TODO: 앱스토어 심사 완료 후 handleTestLogin 제거
  const { handleSocialLogin, handleTestLogin } = useLoginService(navigation);
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

        <View className="flex-row justify-center pb-5">
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

        {/* TODO: 앱스토어 심사 완료 후 테스트 로그인 버튼 제거 */}
        <Pressable
          onPress={handleTestLogin}
          className="mb-20 items-center self-center rounded-lg bg-gray-700 px-6 py-3">
          <Text className="text-gray-300 body-rg-01">테스트 계정 로그인</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;
