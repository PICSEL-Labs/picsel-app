import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { verticalScale } from 'react-native-size-matters';

import {
  AUTO_PLAY_INTERVAL,
  CAROUSEL_HEIGHT,
  IMAGE_HEIGHT,
  PAGINATION_TOP_OFFSET,
  SCROLL_ANIMATION_DURATION,
  SLIDE_COUNT,
} from './constants';
import { paginationStyles } from './styles';

import { WIDTH } from '@/shared/constants/size';
import { ONBOARDING_SLIDES } from '@/shared/constants/text/onboardingText';

interface SlideItem {
  id: number;
  title: string;
  highlight: string;
  image: ImageSourcePropType;
}

const OnboardingCarousel = () => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1">
      <Carousel
        loop
        width={WIDTH}
        height={verticalScale(CAROUSEL_HEIGHT)}
        data={ONBOARDING_SLIDES}
        autoPlay
        autoPlayInterval={AUTO_PLAY_INTERVAL}
        scrollAnimationDuration={SCROLL_ANIMATION_DURATION}
        onProgressChange={(_, p) => (progress.value = p)}
        renderItem={({ item }: { item: SlideItem }) => (
          <View className="flex-1">
            <View className="items-start px-4 pt-20">
              <Text className="w-full text-center text-pink-100 title-05">
                {item.title}
              </Text>
              <Text className="w-full text-center text-pink-500 title-05">
                {item.highlight}
              </Text>
            </View>
            <Image
              source={item.image}
              className={`aspect-square h-[${IMAGE_HEIGHT}px] self-stretch`}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View style={{ marginTop: PAGINATION_TOP_OFFSET }}>
        <Pagination.Basic
          progress={progress}
          data={ONBOARDING_SLIDES.slice(0, SLIDE_COUNT)}
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
