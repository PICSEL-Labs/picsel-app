import React from 'react';

import { Pressable, TextInput, TextInputProps, View } from 'react-native';

import { INPUT_STYLE } from '@/shared/constants/styles/input';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import CloseIcons from '@/shared/icons/CloseIcons';
import SearchIcons from '@/shared/icons/SearchIcons';
import { inputShadow } from '@/styles/inputShadow';

interface Props extends TextInputProps {
  value: string;
  placeholder: string;
  search?: boolean;
  arrow?: boolean;
  close?: boolean;
  handleClear: () => void;
  paddingBottom?: number;
}

const Input = ({
  value,
  placeholder,
  search,
  arrow,
  close,
  handleClear,
  paddingBottom = 32,
  ...props
}: Props) => (
  <View
    className="mx-4 mt-5 items-center justify-center"
    style={{ paddingBottom: paddingBottom }}>
    <View className="w-full rounded-full bg-white shadow" style={inputShadow}>
      <View className="absolute left-5 top-[11px]">
        {search && <SearchIcons shape="gray" width={24} height={24} />}
        {arrow && <ArrowIcons shape="back" width={24} height={24} />}
      </View>

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#B2B5BD"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        selectionColor="#FF6C9A"
        className={INPUT_STYLE}
        {...props}
      />
    </View>
    {value.length > 0 && close && (
      <Pressable
        className="absolute right-5 top-[11px]"
        onPressIn={handleClear}>
        <CloseIcons shape="gray" width={24} height={24} />
      </Pressable>
    )}
  </View>
);

export default Input;
