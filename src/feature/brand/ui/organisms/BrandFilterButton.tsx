import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, PressableProps, Text } from 'react-native';

import { FILTER_BUTTON_STYLE } from '@/shared/constants/styles/filterButton';
import FilterIcons from '@/shared/icons/FilterIcons';
import { cn } from '@/shared/lib/cn';
import { filterButtonShadow } from '@/styles/filterButtonShadow';

const buttonVariants = cva(FILTER_BUTTON_STYLE, {
  variants: {
    variant: {
      active: 'bg-primary-pink',
      inactive: 'bg-neutral-white',
    },
  },
  defaultVariants: {
    variant: 'inactive',
  },
});

const textVariants = cva('body-rg-02', {
  variants: {
    variant: {
      active: 'text-neutral-white',
      inactive: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'inactive',
  },
});

interface Props extends PressableProps, VariantProps<typeof buttonVariants> {}

const BrandFilterButton = ({ variant = 'inactive', ...props }: Props) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant }))}
      style={[filterButtonShadow[variant]]}
      {...props}>
      <FilterIcons
        shape={variant === 'active' ? 'white' : 'gray'}
        width={24}
        height={24}
      />
      <Text className={cn(textVariants({ variant }))}>브랜드 찾기</Text>
    </Pressable>
  );
};

export default BrandFilterButton;
