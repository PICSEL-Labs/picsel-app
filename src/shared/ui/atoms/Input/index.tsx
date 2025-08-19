import React from 'react';

import { Pressable, TextInput, TextInputProps, View } from 'react-native';

import { INPUT_STYLE } from '@/shared/constants/styles/input';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import CloseIcons from '@/shared/icons/CloseIcons';
import SearchIcons from '@/shared/icons/SearchIcons';
import { inputShadow } from '@/styles/inputShadow';

interface Props extends TextInputProps {
  value: string;
  placeholder?: string;
  search?: boolean;
  arrow?: boolean;
  close?: boolean;
  handleClear: () => void;
  container?: string;
  onPressLeft?: () => void;
}

const ICON_POSITION = 'absolute left-5 top-[11px]';

const Input = ({
  value,
  placeholder,
  search,
  arrow,
  close,
  handleClear,
  container,
  onPressLeft,
  ...props
}: Props) => (
  <View className={container}>
    <View className="mx-4 rounded-full bg-white shadow" style={inputShadow}>
      {arrow ? (
        <Pressable
          className={ICON_POSITION}
          style={{ zIndex: 1 }}
          onPress={onPressLeft}
          hitSlop={8}
          disabled={!onPressLeft}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
      ) : search ? (
        <View className={ICON_POSITION}>
          <SearchIcons shape="gray" width={24} height={24} />
        </View>
      ) : null}

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

      {value.length > 0 && close && (
        <Pressable
          className="absolute right-5 top-[11px]"
          onPressIn={handleClear}>
          <CloseIcons shape="gray" width={24} height={24} />
        </Pressable>
      )}
    </View>
  </View>
);

export default Input;
