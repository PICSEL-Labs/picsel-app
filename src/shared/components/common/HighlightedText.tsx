import React from 'react';

import { Text } from 'react-native';

import { useHighlightText } from '@/shared/hooks/useHighlightText';
import { cn } from '@/shared/lib/cn';

interface Props {
  text: string;
  keyword?: string;
  fontSize:
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | string;
  color?: string;
  highlightColor?: string;
  fontWeight?: 'font-normal' | 'font-medium' | 'font-semibold' | string;
  highlightWeight?: 'font-bold' | 'font-extrabold' | string;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
  leading?: string;
}

export const HighlightedText = ({
  text,
  keyword,
  fontSize,
  fontWeight = 'font-semibold',
  highlightWeight = 'font-bold',
  textAlign = 'text-center',
  color = '#111114',
  highlightColor = '#FF6C9A',
  leading = 'leading-[36px]',
}: Props) => {
  const formattedText = keyword
    ? text.replace(new RegExp(`(${keyword})`, 'gi'), '[$1]')
    : text;

  const parts = useHighlightText(formattedText);

  return (
    <Text
      className={cn(fontSize, fontWeight, textAlign, leading)}
      style={{ color }}>
      {parts.map((part, index) => (
        <Text
          key={index}
          className={cn(part.highlight ? highlightWeight : fontWeight)}
          style={{ color: part.highlight ? highlightColor : color }}>
          {part.text}
        </Text>
      ))}
    </Text>
  );
};
