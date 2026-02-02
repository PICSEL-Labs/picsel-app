import React from 'react';

import { Pressable, Text } from 'react-native';

import CheckboxIcons from '@/shared/icons/CheckboxIcons';

interface Props {
  id: string;
  label: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ReasonCheckbox = ({ id, label, isSelected, onToggle }: Props) => {
  return (
    <Pressable
      onPress={() => onToggle(id)}
      className="flex-row items-center py-3"
      style={{ gap: 8 }}>
      <CheckboxIcons
        shape={isSelected ? 'pink' : 'check-black'}
        width={22}
        height={22}
      />
      <Text className="text-gray-900 body-rg-03">{label}</Text>
    </Pressable>
  );
};

export default ReasonCheckbox;
