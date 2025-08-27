import React from 'react';

import { cva } from 'class-variance-authority';
import { Pressable, PressableProps, Text } from 'react-native';

import { BUTTON_STYLE } from '@/shared/constants/styles/button';
import { cn } from '@/shared/lib/cn';
import { circleDefaultShadow } from '@/styles/shadows';

interface Props extends PressableProps {
  color?: 'active' | 'disabled' | 'white';
  textColor?: 'pink' | 'white' | 'gray';
  outline?: 'active' | 'disabled';
  text: string;
  shadow?: boolean;
}

const buttonVariants = cva(BUTTON_STYLE, {
  variants: {
    color: {
      active: 'bg-pink-500 text-white',
      disabled: 'bg-gray-100',
      white: 'bg-white',
    },
    outline: {
      active: 'border-2 border-pink-500 bg-white',
      disabled: 'border-2 border-gray-300 bg-white',
    },
  },
});

const textVariants = cva('headline-04', {
  variants: {
    textColor: {
      pink: 'text-pink-600',
      white: 'text-white',
      gray: 'text-gray-600',
    },
  },
});

const Button = ({
  color = 'active',
  textColor,
  className,
  text,
  outline,
  shadow,
  ...props
}: Props) => (
  <Pressable
    className={cn(buttonVariants({ color, outline }), className)}
    style={shadow && circleDefaultShadow}
    {...props}>
    <Text className={cn(textVariants({ textColor }))}>{text}</Text>
  </Pressable>
);

export default Button;
