import React from 'react';

import { View, Text } from 'react-native';

import Toggle from '@/shared/ui/atoms/Toggle';

interface Props {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  subText?: string;
}

const SettingMenuItem = ({
  title,
  description,
  value,
  onValueChange,
  subText,
}: Props) => {
  return (
    <View className="flex flex-col self-stretch py-3">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-col space-y-1">
          <Text className="text-gray-900 headline-02">{title}</Text>
          <Text className="text-gray-600 body-rg-02">{description}</Text>
        </View>
        <Toggle value={value} onValueChange={onValueChange} />
      </View>
      {subText && (
        <Text className="mt-1 text-gray-400 body-rg-02">{subText}</Text>
      )}
    </View>
  );
};

export default SettingMenuItem;
