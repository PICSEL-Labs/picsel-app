import React, { ReactNode } from 'react';

import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import { View, Text, Pressable } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  title: string;
  white?: boolean;
  showBackButton?: boolean;
  rightElement?: ReactNode;
  className?: string;
  rightIconPress?: () => void;
  onBackPress?: () => void;
}

const MypageHeader = ({
  title,
  showBackButton = true,
  white = false,
  rightElement,
  className = '',
  rightIconPress,
  onBackPress,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View className={`flex w-full flex-row items-center py-2 ${className}`}>
      {showBackButton && (
        <Pressable
          className="absolute left-4 z-10"
          onPress={onBackPress ?? (() => navigation.goBack())}>
          <ArrowIcons
            shape={white ? 'back-white' : 'back'}
            width={24}
            height={24}
          />
        </Pressable>
      )}

      <Text
        className={clsx(
          'flex-1 px-10 text-center text-gray-900 title-01',
          white && 'text-white',
        )}
        numberOfLines={1}
        ellipsizeMode="tail">
        {title}
      </Text>

      {rightElement && (
        <Pressable onPress={rightIconPress} className="absolute right-4 z-10">
          {rightElement}
        </Pressable>
      )}
    </View>
  );
};

export default MypageHeader;
