import React, { ReactNode } from 'react';

import { Pressable, Text, View } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const ListItem = ({ label, onPress, rightIcon, leftIcon = null }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center justify-between self-stretch py-3">
      <View className="flex-row items-center" style={{ gap: 10 }}>
        {leftIcon && leftIcon}
        <Text className="text-gray-900 headline-02">{label}</Text>
      </View>
      {rightIcon}
    </Pressable>
  );
};

export default ListItem;
