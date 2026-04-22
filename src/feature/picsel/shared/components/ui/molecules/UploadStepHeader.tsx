import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
}

const UploadStepHeader = ({ title, description }: Props) => (
  <View className="gap-2 px-5 pb-3 pt-5">
    <Text className="text-gray-900 headline-04">{title}</Text>
    {description && (
      <Text className="text-gray-600 body-rg-02">{description}</Text>
    )}
  </View>
);

export default UploadStepHeader;
