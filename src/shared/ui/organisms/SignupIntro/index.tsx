import React from 'react';

import { View, Text } from 'react-native';

import { HighlightedText } from '@/shared/components/HighlightedText';
import SparkleImages from '@/shared/images/Sparkle';

interface Props {
  title: string;
  sub: string;
  icon?: boolean;
}

const SignupIntro = ({ title, sub, icon = false }: Props) => {
  return (
    <View className="mx-5 mt-8">
      <View className="flex-row">
        <HighlightedText text={title} font="title-05" textAlign="text-left" />
        {icon && (
          <View className="top-0.5">
            <SparkleImages shape="icon" height={36} width={32} />
          </View>
        )}
      </View>

      <Text className="my-4 text-gray-900 body-rg-03">{sub}</Text>
    </View>
  );
};

export default SignupIntro;
