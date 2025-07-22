import React from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { verticalScale } from 'react-native-size-matters';

import { paginationStyles } from './styles';

import { HighlightedText } from '@/shared/components/HighlightedText';
import { WIDTH } from '@/shared/constants/size';
import { ONBOARDING_TEXT } from '@/shared/constants/text/onboardingText';

const OnboardingCarousel = () => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1">
      <Carousel
        loop
        width={WIDTH}
        height={verticalScale(400)}
        data={ONBOARDING_TEXT}
        autoPlay
        autoPlayInterval={1000}
        scrollAnimationDuration={2000}
        onProgressChange={(_, p) => (progress.value = p)}
        renderItem={({ item }) => (
          <View className="items-center pt-20">
            <View className="mb-14 h-[120px] items-center">
              <HighlightedText text={item.text} font="title-05" />
            </View>
            <View className={`${item.color} h-[280px] w-[220px] rounded-3xl`} />
          </View>
        )}
      />

      <View className="mb-[88px] flex-1 justify-end">
        <Pagination.Basic
          progress={progress}
          data={ONBOARDING_TEXT.slice(0, 4)}
          activeDotStyle={paginationStyles.activeDotStyle}
          dotStyle={paginationStyles.dotStyle}
          containerStyle={
            paginationStyles.containerStyle as StyleProp<ViewStyle>
          }
        />
      </View>
    </View>
  );
};

export default OnboardingCarousel;
