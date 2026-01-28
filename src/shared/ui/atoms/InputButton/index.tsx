import React, { ReactNode } from 'react';

import { Pressable, Text, View } from 'react-native';

import { inputShadow } from '@/shared/styles/shadows';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  Icon: ReactNode;
  onPress?: () => void;
}

const InputButton = ({ label, value, placeholder, Icon, onPress }: Props) => {
  const isSelected = value.length > 0;

  return (
    <View className="gap-3 px-5 pb-10">
      <Text className="text-gray-900 headline-02">{label}</Text>

      <Pressable
        onPress={onPress}
        className="flex-row items-center rounded-full bg-white px-5 py-[10px]"
        style={inputShadow}>
        <View className="pr-2">{Icon}</View>

        <Text
          className={`${
            isSelected
              ? 'text-gray-900 headline-02'
              : 'text-gray-500 body-rg-03'
          } `}>
          {value || placeholder}
        </Text>
      </Pressable>
    </View>
  );
};

export default InputButton;
