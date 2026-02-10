import React from 'react';

import { View } from 'react-native';

import SettingMenuItem from '../atoms/SettingMenuItem';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

interface Props {
  items: SettingItem[];
}

const SettingMenuList = ({ items }: Props) => {
  return (
    <View className="flex flex-col self-stretch px-4">
      {items.map(item => (
        <SettingMenuItem
          key={item.id}
          title={item.title}
          description={item.description}
          value={item.value}
          onValueChange={item.onValueChange}
        />
      ))}
    </View>
  );
};

export default SettingMenuList;
