import React, { ReactNode } from 'react';

import { Pressable, Text, View } from 'react-native';

import { BOX_MAIN_BOX_SHADOWS } from '../../../constants/styles';

import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  onPress: () => void;
  backgroundColor?: string;
}

const MypageMenuItem = ({
  title,
  description,
  icon = <SparkleImages shape="icon" width={24} height={32} />,
  onPress,
  backgroundColor = 'bg-white',
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full items-start justify-center self-center rounded-xl py-5 ${backgroundColor}`}
      style={{
        boxShadow: BOX_MAIN_BOX_SHADOWS,
      }}>
      <View className="relative ml-11 flex-row items-center" style={{ gap: 4 }}>
        <View className="absolute -left-8 top-1">{icon}</View>
        <Text className="text-gray-900 headline-02">{title}</Text>
      </View>

      <Text className="ml-11 mt-1 text-gray-600 body-rg-02">{description}</Text>
    </Pressable>
  );
};

export default MypageMenuItem;
