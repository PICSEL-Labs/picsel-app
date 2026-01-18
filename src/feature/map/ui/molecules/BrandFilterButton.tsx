import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Animated, Pressable, PressableProps, View } from 'react-native';

import BrandFilterTooltip from './BrandFilterTooltip';

import { FILTER_BUTTON_STYLE } from '@/shared/constants/styles/filterButton';
import FilterIcons from '@/shared/icons/FilterIcons';
import { cn } from '@/shared/lib/cn';
import { filterButtonShadow } from '@/shared/styles/shadows';

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
interface Props extends PressableProps, VariantProps<typeof buttonVariants> {
  showTooltip?: boolean;
  fadeAnim?: Animated.Value;
}

const BrandFilterButton = ({
  variant = 'inactive',
  showTooltip = false,
  fadeAnim,
  ...props
}: Props) => {
  return (
    <View>
      <Pressable
        className={cn(buttonVariants({ variant }))}
        style={[filterButtonShadow[variant]]}
        {...props}>
        <FilterIcons
          shape={variant === 'active' ? 'white' : 'gray'}
          width={24}
          height={24}
        />
      </Pressable>
      {showTooltip && <BrandFilterTooltip fadeAnim={fadeAnim} />}
    </View>
  );
};

export default BrandFilterButton;
