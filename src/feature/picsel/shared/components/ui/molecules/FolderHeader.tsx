import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';

interface FolderHeaderProps {
  title: string;
  onBack: () => void;
}

const FolderHeader = ({ title, onBack }: FolderHeaderProps) => {
  return (
    <View className="flex-row items-center bg-white px-6 pt-4">
      <Pressable onPress={onBack}>
        <ArrowIcons shape="back" width={24} height={24} />
      </Pressable>
      <Text className="flex-1 text-center text-gray-900 headline-03">
        {title}
      </Text>
      <View className="w-6" />
    </View>
  );
};

export default FolderHeader;
