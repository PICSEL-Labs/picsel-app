import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface FolderHeaderProps {
  title: string;
  onBack: () => void;
  showToggle?: boolean;
  onTogglePress?: () => void;
}

const FolderHeader = ({
  title,
  onBack,
  showToggle = false,
  onTogglePress,
}: FolderHeaderProps) => {
  return (
    <View className="flex-row items-center bg-white px-6 pt-4">
      <Pressable onPress={onBack}>
        <ArrowIcons shape="back" width={24} height={24} />
      </Pressable>
      <View className="flex-1 flex-row items-center justify-center">
        <Text className="text-gray-900 headline-03">{title}</Text>
        {showToggle && (
          <Pressable onPress={onTogglePress}>
            <ToggleIcons shape="down" color="#676B79" width={24} height={24} />
          </Pressable>
        )}
      </View>
      <View className="w-6" />
    </View>
  );
};

export default FolderHeader;
