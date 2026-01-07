import React from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import PhotoSkeleton from '@/feature/picsel/shared/components/ui/atoms/PhotoSkeleton';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import SparkleIcons from '@/shared/icons/SparkleIcons';

interface Photo {
  id: string;
  uri: string;
  date: string;
  storeName: string;
}

interface MonthGroup {
  month: string;
  photos: Photo[];
}

interface Props {
  monthGroups: MonthGroup[];
  isLoading: boolean;
  onViewMore: (month: string) => void;
}

const HORIZONTAL_PADDING = 24;
const ITEM_SPACING = 8;

const MonthPhotoListView = ({ monthGroups, isLoading, onViewMore }: Props) => {
  const { width: screenWidth } = useWindowDimensions();

  const imageWidth = (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING) / 2;
  const imageHeight = imageWidth * 1.5;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.getDay()];

    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  if (isLoading) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 20,
        }}>
        {Array.from({ length: 3 }).map((__, monthIndex) => (
          <View key={`skeleton-month-${monthIndex}`} className="mb-6">
            {/* Month Header Skeleton */}
            <View className="mb-3 h-6 w-20 rounded bg-gray-200" />

            {/* Photos Skeleton */}
            <View className="flex-row flex-wrap">
              {Array.from({ length: 4 }).map((_, photoIndex) => (
                <View
                  key={`skeleton-${photoIndex}`}
                  style={{
                    width: imageWidth,
                    marginRight: photoIndex % 2 === 0 ? ITEM_SPACING : 0,
                  }}>
                  <PhotoSkeleton
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: 20,
        paddingTop: 12,
      }}>
      {monthGroups.map((monthGroup, monthIndex) => (
        <View key={`${monthGroup.month}-${monthIndex}`} className="mb-8">
          {/* Month Header */}
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-gray-900 headline-02">
              {monthGroup.month}
            </Text>
            <Pressable
              onPress={() => onViewMore(monthGroup.month)}
              className="flex-row items-center">
              <ArrowIcons shape="next" width={20} height={20} />
            </Pressable>
          </View>

          {/* Horizontal Scroll List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {monthGroup.photos.map(photo => (
                <View
                  key={photo.id}
                  className="mr-3"
                  style={{
                    width: imageWidth,
                  }}>
                  {/* 날짜 */}
                  <Text className="mb-1 text-gray-900 headline-01">
                    {formatDate(photo.date)}
                  </Text>

                  {/* 사진 */}
                  <Pressable className="relative">
                    <View
                      className="overflow-hidden"
                      style={{ width: imageWidth, height: imageHeight }}>
                      <Image
                        source={{ uri: photo.uri }}
                        style={{ width: imageWidth, height: imageHeight }}
                        resizeMode="cover"
                      />
                    </View>

                    {/* 매장명 */}
                    <View className="mt-1 flex-row items-center">
                      <SparkleIcons shape="on" width={20} height={20} />
                      <Text
                        className="ml-1 text-gray-900 body-rg-03"
                        numberOfLines={1}>
                        {photo.storeName}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default MonthPhotoListView;
