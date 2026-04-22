import React from 'react';

import { TextInput } from 'react-native';

import { INPUT_PLACEHOLDER } from '../../../constants/withdrawalText';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
}

const EtcReasonInput = ({ value, onChangeText, onFocus }: Props) => {
  return (
    <TextInput
      className="mt-1 h-40 w-full rounded-xl border border-gray-300 p-4 font-nanum-square-ac-regular text-[16px] leading-5 text-primary-black"
      placeholder={INPUT_PLACEHOLDER}
      placeholderTextColor="#7E8392"
      multiline
      textAlignVertical="top"
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
    />
  );
};

export default EtcReasonInput;
