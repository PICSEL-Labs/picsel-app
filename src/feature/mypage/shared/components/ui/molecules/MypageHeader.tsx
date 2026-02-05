import React, { ReactNode } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  title: string;
  showBackButton?: boolean;
  rightElement?: ReactNode;
  className?: string;
  rightIconPress?: () => void;
}

const MypageHeader = ({
  title,
  showBackButton = true,
  rightElement,
  className = '',
  rightIconPress,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View className={`flex w-full flex-row items-center py-2 ${className}`}>
      {showBackButton && (
        <Pressable
          className="absolute left-4 z-10"
          onPress={() => navigation.goBack()}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
      )}

      <Text className="flex-1 text-center text-gray-900 title-01">{title}</Text>

      {rightElement && (
        <Pressable onPress={rightIconPress} className="absolute right-4 z-10">
          {rightElement}
        </Pressable>
      )}
    </View>
  );
};

export default MypageHeader;
