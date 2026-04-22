import React from 'react';

import { Text } from 'react-native';

import { useHighlightText } from '@/shared/hooks/useHighlightText';
import { cn } from '@/shared/lib/cn';

interface Props {
  text: string;
  keyword?: string | string[];
  font?: string;
  color?: string;
  highlightColor?: string;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
  search?: boolean;
  highlightWeight?: string;
  fontWeight?: string;
  numberOfLines?: number;
  className?: string;
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
  numberOfLines,
  className,
}: Props) => {
  const regex = keyword
    ? new RegExp(
        `(${Array.isArray(keyword) ? keyword.join('|') : keyword})`,
        'gi',
      )
    : null;

  const formattedText = regex ? text.replace(regex, '[$1]') : text;

  const parts = useHighlightText(formattedText);

  return (
    <Text
      className={cn(font, textAlign, className)}
      style={{ color }}
      numberOfLines={numberOfLines}>
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
