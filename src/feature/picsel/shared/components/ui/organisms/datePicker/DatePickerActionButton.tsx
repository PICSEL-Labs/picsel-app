import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { PickerMode } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';

interface Props {
  mode: PickerMode;
  onConfirm: () => void;
}

const DatePickerActionButton = ({ mode, onConfirm }: Props) => {
  const label = mode === 'day' ? '완료' : '확인';

  return (
    <View className="items-end px-4 py-3">
      <Pressable onPress={onConfirm} className="w-full items-end">
        <Text className="p-2 text-pink-500 headline-02">{label}</Text>
      </Pressable>
    </View>
  );
};

export default DatePickerActionButton;
