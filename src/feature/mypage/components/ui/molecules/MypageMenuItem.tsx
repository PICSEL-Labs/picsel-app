import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
}

const MypageMenuItem = ({
  title,
  description,
  icon = <SparkleImages shape="icon" width={32} height={36} />,
  onPress,
  backgroundColor = 'bg-white',
}: Props) => {
  return (
    <View
      className={`h-[88px] w-full items-start justify-center self-center rounded-xl ${backgroundColor}`}
      style={{
        boxShadow:
          '0 -2px 8px 0 rgba(0, 0, 0, 0.05) inset, 0 -2px 8px 2px rgba(0, 0, 0, 0.10), 2px 4px 8px 0 rgba(255, 255, 255, 0.25) inset',
      }}>
      <View className="ml-2 flex-row items-center" style={{ gap: 4 }}>
        {icon}
        <Text className="text-gray-900 headline-02">{title}</Text>
        <Pressable onPress={onPress}>
          <ArrowIcons shape="next" width={24} height={24} />
        </Pressable>
      </View>

      <Text className="ml-11 mt-1 text-gray-600 body-rg-02">{description}</Text>
    </View>
  );
};

export default MypageMenuItem;
