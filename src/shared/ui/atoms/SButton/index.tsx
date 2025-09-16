import React from 'react';

import { cva } from 'class-variance-authority';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { SBUTTON_STYLE } from '@/shared/constants/styles/button';
import { cn } from '@/shared/lib/cn';

interface Props extends TouchableOpacityProps {
  color?: 'default' | 'disabled' | 'textOnly';
  textColor?: 'white' | 'gray';
  text: string;
}

const buttonVariants = cva(SBUTTON_STYLE, {
  variants: {
    color: {
      default: 'bg-pink-500',
      disabled: 'bg-gray-100',
      textOnly: 'bg-gray-50',
    },
  },
});

const textVariants = cva('headline-02', {
  variants: {
    textColor: {
      white: 'text-white',
      gray: 'text-gray-500',
    },
  },
});

// disable or active가 필요 없을 경우에는 activeOpacity props를 1로 선언해주시면 됩니다.
const SButton = ({
  color = 'default',
  textColor,
  className,
  text,
  ...props
}: Props) => (
  <TouchableOpacity
    className={cn(buttonVariants({ color }), className)}
    {...props}>
    <Text className={cn(textVariants({ textColor }))}>{text}</Text>
  </TouchableOpacity>
);

export default SButton;
