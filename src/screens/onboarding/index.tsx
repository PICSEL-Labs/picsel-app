import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { OnboardingText } from '@/shared/components/common/OnboardingText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { ONBOARDING_TEXT } from '@/shared/constants/onboardingText';
import { WIDTH } from '@/shared/constants/size';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const OnboardingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [carouselIdx, setCarouselIdx] = useState(0);

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center">
        <Carousel
          loop={false}
          width={WIDTH}
          height={400}
          data={ONBOARDING_TEXT}
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          onSnapToItem={index => {
            setCarouselIdx(index);
          }}
          renderItem={({ item }) => (
            <View className="items-center justify-center">
              <View className="mb-10 h-[110px]">
                <OnboardingText text={item.text} />
              </View>

              <View className={`${item.color} w-[320px] h-[200px]`} />
            </View>
          )}
        />

        {/* indicator */}
        {carouselIdx < 4 && (
          <View className="flex-row space-x-2 mt-8">
            {ONBOARDING_TEXT.slice(0, 4).map((_, index) => (
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

      {/* 로그인 하러 가기 버튼 */}
      <View className="items-center">
        <Pressable
          onPress={() => navigation.navigate('Login')}
          className="bg-pink-500 w-[330px] h-[56px] rounded-[40px] justify-center items-center mb-6">
          <Text className="text-white font-semibold text-[20px]">
            로그인 하러 가기
          </Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default OnboardingScreen;
