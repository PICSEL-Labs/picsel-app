import React from 'react';

import { View, Text } from 'react-native';

import Toggle from '@/shared/ui/atoms/Toggle';

interface Props {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingMenuItem = ({
  title,
  description,
  value,
  onValueChange,
}: Props) => {
  return (
    <View className="flex flex-row items-center justify-between self-stretch py-3">
      <View className="flex flex-col space-y-1">
        <Text className="text-gray-900 headline-02">{title}</Text>
        <Text className="text-gray-600 body-rg-02">{description}</Text>
      </View>
      <Toggle value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default SettingMenuItem;
