import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import PicselDetailHeader from '@/feature/picsel/myPicsel/components/ui/molecules/PicselDetailHeader';
import { useGetPicselDetail } from '@/feature/picsel/myPicsel/queries/useGetPicselDetail';
import { usePhotoFormat } from '@/feature/picsel/shared/utils/usePhotoFormat';
import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import AspectRatioImage from '@/shared/components/ui/atoms/AspectRatioImage';
import SparkleImages from '@/shared/images/Sparkle';
import { getImageUrl } from '@/shared/utils/image';

type Props = NativeStackScreenProps<MainNavigationProps, 'PicselDetail'>;

const PicselDetailScreen = ({ route, navigation }: Props) => {
  const { picselId } = route.params;
  const { formatDate } = usePhotoFormat();

  const { data: picsel, isError } = useGetPicselDetail(picselId);

  if (isError || !picsel) {
    return null;
  }

  return (
    <ScreenLayout>
      <PicselDetailHeader onBack={() => navigation.goBack()} />
      <ScrollView>
        <View className="items-center">
          <Text className="px-4 text-gray-900 headline-01">
            {formatDate(picsel.takenDate)}
          </Text>
          <Text className="px-4 py-1 text-gray-900 title-01">
            {picsel.title}
          </Text>

          <View className="flex-row items-center gap-1">
            <SparkleImages shape="icon-one" height={24} width={24} />
            <Text className="text-gray-900 body-rg-03">
              {picsel.store.storeName}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between px-4">
          {picsel.photos.map((photo, index) => (
            <AspectRatioImage
              key={index}
              uri={getImageUrl(photo.imagePath)}
              className="mb-4"
            />
          ))}
        </View>

        <View className="px-6 pb-6 pt-2">
          <Text className="text-gray-900 body-rg-02">{picsel.content}</Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default PicselDetailScreen;
