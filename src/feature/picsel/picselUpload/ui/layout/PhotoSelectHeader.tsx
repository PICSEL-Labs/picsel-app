import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import { getPhotoHeaderText, PhotoVariant } from '../../lib/getPhotoHeaderText';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';

interface Props {
  variant: PhotoVariant;
  onReset?: () => void;
  hasSelected?: boolean;
}

const PhotoSelectHeader = ({ variant, onReset, hasSelected }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { title, desc } = getPhotoHeaderText(variant);

  return (
    <>
      <View className="relative flex-row items-center justify-center px-4 py-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute left-5 items-start">
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="text-center text-gray-900 title-01">{title}</Text>
        {hasSelected && (
          <Pressable
            onPress={onReset}
            className="absolute right-5 flex-row items-center justify-end">
            <Text className="text-pink-500 headline-02">초기화</Text>
            <ReplayIcons width={24} height={24} shape="true" />
          </Pressable>
        )}
      </View>

      <View className="px-1 py-2">{desc}</View>
    </>
  );
};

export default PhotoSelectHeader;
