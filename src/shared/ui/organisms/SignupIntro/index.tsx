import React from 'react';

import { View, Text } from 'react-native';

import { HighlightedText } from '@/shared/components/HighlightedText';
import SparkleIcons from '@/shared/icons/SparkleIcons';

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
        {icon && <SparkleIcons shape="double" width={32} height={32} />}
      </View>

      <Text className="my-4 text-gray-900 body-rg-03">{sub}</Text>
    </View>
  );
};

export default SignupIntro;
