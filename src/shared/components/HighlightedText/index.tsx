import React from 'react';

import { Text } from 'react-native';

import { useHighlightText } from '@/shared/hooks/useHighlightText';
import { cn } from '@/shared/lib/cn';

interface Props {
  text: string;
  keyword?: string;
  font?: string;
  color?: string;
  highlightColor?: string;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
  search?: boolean;
  highlightWeight?: string;
  fontWeight?: string;
}

export const HighlightedText = ({
  text,
  keyword,
  font,
  textAlign = 'text-center',
  color = 'text-gray-900',
  highlightColor = 'text-pink-500',
  highlightWeight,
  fontWeight,
}: Props) => {
  const formattedText = keyword
    ? text.replace(new RegExp(`(${keyword})`, 'gi'), '[$1]')
    : text;

  const parts = useHighlightText(formattedText);

  return (
    <Text className={cn(font, textAlign)} style={{ color }}>
      {parts.map((part, index) => (
        <Text
          key={index}
          className={cn(
            part.highlight ? highlightColor : color,
            part.highlight ? highlightWeight : fontWeight,
          )}>
          {part.text}
        </Text>
      ))}
    </Text>
  );
};
