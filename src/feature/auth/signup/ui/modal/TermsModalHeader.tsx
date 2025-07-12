import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  title: string;
}

const TermsModalHeader = ({ title }: Props) => (
  <>
    <View className="mb-4 h-[5px] w-[36px] self-center rounded-full bg-gray-300" />
    <Text className="mb-[29px] text-center text-gray-900 title-01">
      {title}
    </Text>
  </>
);

export default TermsModalHeader;
