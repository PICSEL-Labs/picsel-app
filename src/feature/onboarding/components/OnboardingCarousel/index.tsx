import React from 'react';

import {
  Image,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { verticalScale } from 'react-native-size-matters';

import {
  AUTO_PLAY_INTERVAL,
  CAROUSEL_HEIGHT,
  PAGINATION_MARGIN_BOTTOM,
  PAGINATION_MARGIN_TOP,
  SCROLL_ANIMATION_DURATION,
  SLIDE_COUNT,
} from './constants';
import { paginationStyles } from './styles';

import { WIDTH } from '@/shared/constants/size';
import { ONBOARDING_SLIDES } from '@/shared/constants/text/onboardingText';

interface SlideItem {
  id: number;
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
          <View className="flex-1 pt-6">
            <Image
              source={item.image}
              style={{ height: 588, width: WIDTH }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View
        style={{
          marginTop: PAGINATION_MARGIN_TOP,
          marginBottom: PAGINATION_MARGIN_BOTTOM,
        }}>
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
