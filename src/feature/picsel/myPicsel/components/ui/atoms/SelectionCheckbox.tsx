import React from 'react';

import { View } from 'react-native';

import CheckIcons from '@/shared/icons/CheckIcons';
import { defaultButtonShadow } from '@/shared/styles/shadows';

interface Props {
  isSelected: boolean;
}

const SelectionCheckbox = ({ isSelected }: Props) => {
  return (
    <View className="mb-2 mr-2 self-end">
      <View
        style={defaultButtonShadow}
        className={`h-6 w-6 items-center justify-center rounded-full bg-white ${
          isSelected
            ? 'border-2 border-primary-pink bg-pink-500'
            : 'border-2 border-secondary-pink-300'
        }`}>
        {isSelected && <CheckIcons shape="white" width={13} height={13} />}
      </View>
    </View>
  );
};

export default SelectionCheckbox;
