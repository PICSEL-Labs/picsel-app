import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { HighlightedText } from '@/shared/components/HighlightedText';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { ONBOARDING_TEXT } from '@/shared/constants/onboardingText';
import { WIDTH } from '@/shared/constants/size';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

const OnboardingScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [carouselIdx, setCarouselIdx] = useState(0);

  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center">
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
                <HighlightedText
                  text={item.text}
                  fontSize="text-[24px]"
                  fontWeight="font-semibold"
                  highlightWeight="font-bold"
                />
              </View>
              <View className={`${item.color} h-[200px] w-[320px]`} />
            </View>
          )}
        />

        {/* indicator */}
        {carouselIdx < 4 && (
          <View className="mt-8 flex-row space-x-2">
            {ONBOARDING_TEXT.slice(0, 4).map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full ${
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
          className="mb-6 h-[56px] w-[330px] items-center justify-center rounded-[40px] bg-pink-500">
          <Text className="text-[20px] font-semibold text-white">
            로그인 하러 가기
          </Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default OnboardingScreen;
