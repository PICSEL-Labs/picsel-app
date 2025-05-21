import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  onboardingShowData,
  OnboardingText,
} from '@/components/OnboardingText';
import { loginApi, loginStrategies } from '@/feature/auth/login/api/loginApi';
import {
  LoginRequest,
  LoginResponse,
  SocialTypes,
} from '@/feature/auth/login/types';
import { RootStackNavigationProp } from '@/shared/lib/navigation/navigateTypeUtil';
import { useAuthStore } from '@/store/authStore';

const OnboardingTestScreen = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);

  // User Auth State
  const {
    setSocialAccessToken,
    setAccessToken,
    setRefreshToken,
    setSocialType,
  } = useAuthStore();

  const navigation = useNavigation<RootStackNavigationProp>();

  // 소셜 로그인 기능
  const handleSocialLogin = async (socialType: SocialTypes) => {
    try {
      // 플랫폼에서 응답으로 받아오는 socialAccessToken
      const socialAccessToken = await loginStrategies[socialType]();

      // 소셜 토큰과 소셜 타입 authStore에 저장
      setSocialAccessToken(socialAccessToken);
      setSocialType(socialType);

      // 비동기적으로 상태가 업데이트 되기 때문에 플랫폼에서 받아온 token을 바로 파라미터로 넣은 후, Login API 요청
      await handleLogin({ socialType, socialAccessToken });
    } catch (err) {
      console.error(`${socialType} 로그인 실패:`, err);
    }
  };

  // 서비스 로그인 기능
  const handleLogin = async (loginPayload: LoginRequest) => {
    try {
      // login api 호출
      const response = await loginApi(loginPayload);

      console.log('로그인 성공:', response.data);

      response.data.signUp
        ? handleSuccessfulLogin(response)
        : navigation.navigate('Signup');
    } catch (err) {
      console.error('로그인 실패:', err);
    }
  };

  // 로그인 성공했을 때 action
  const handleSuccessfulLogin = (response: LoginResponse) => {
    setSocialAccessToken(null);
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    navigation.navigate('Home');
  };

  // carousel 3초 단위
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx(prevIdx => {
        if (prevIdx >= 3) {
          clearInterval(interval); // 마지막 carousel(id: 3)시 중지

          return prevIdx;
        }

        return prevIdx + 1;
      });
    }, 3000);

    return () => clearInterval(interval); // 언마운트 시 정리
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      {/* Carousel */}
      <View className="flex-1 justify-center items-center">
        {onboardingShowData.map(
          (item, idx) =>
            carouselIdx === item.id && (
              <View key={idx} className="items-center">
                <OnboardingText text={item.text} />

                {/* carousel img */}
                <View className={`${item.color} w-[320px] h-[200px]`} />
              </View>
            ),
        )}

        {/* indicator */}
        {carouselIdx < 4 && (
          <View className="flex-row space-x-2 mt-14">
            {/* 로그인 화면 제외하고 온보딩 idx만 렌더링 */}
            {onboardingShowData.slice(0, 4).map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === carouselIdx ? 'bg-gray-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
        )}
      </View>

      {/* 하단 button  */}
      {carouselIdx === 4 ? (
        <View className="space-y-2">
          {/* 로그인 모드 */}
          <Pressable
            onPress={() => handleSocialLogin('NAVER')}
            className="bg-green-500 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              네이버 로그인
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialLogin('KAKAO')}
            className="bg-yellow-500 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              카카오 로그인
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialLogin('GOOGLE')}
            className="bg-gray-300 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              구글 로그인
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialLogin('APPLE')}
            className="bg-black w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              애플 로그인
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* 온보딩 모드 */}
          <Pressable
            onPress={() => setCarouselIdx(4)}
            className="bg-pink-500 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              로그인 하러 가기
            </Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
};

export default OnboardingTestScreen;
