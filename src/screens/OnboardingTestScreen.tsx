import React, { useEffect, useState } from 'react';

import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  onboardingShowData,
  OnboardingText,
} from '@/components/OnboardingText';

const OnboardingTestScreen = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);

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

  // 로그인 하러 가기 클릭시
  const handleLogin = () => {
    setCarouselIdx(4); // login 텍스트 렌더링
  };

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
            onPress={handleLogin}
            className="bg-green-500 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              네이버 로그인
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            className="bg-yellow-500 w-[320px] h-[56px] rounded-[40px] justify-center items-center mb-2">
            <Text className="text-white font-semibold text-[20px]">
              카카오 로그인
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
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
            onPress={handleLogin}
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
