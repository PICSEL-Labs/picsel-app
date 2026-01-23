import React, { ReactNode } from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';

interface Props {
  label: string;
  onPress: () => void;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const ListItem = ({
  label,
  onPress,
  rightIcon = <ArrowIcons shape="next" width={30} height={30} />,
  leftIcon,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center justify-between self-stretch py-3">
      <View className="flex-row items-center" style={{ gap: 8 }}>
        {leftIcon}
        <Text className="text-gray-900 body-rg-03">{label}</Text>
      </View>
      {rightIcon}
    </Pressable>
  );
};

export default ListItem;
