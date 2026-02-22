import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  title: string;
}

const NotificationTitle = ({ title }: Props) => {
  return (
    <View className="self-stretch px-4">
      <Text className="text-gray-900 headline-03">{title}</Text>
    </View>
  );
};

export default NotificationTitle;
