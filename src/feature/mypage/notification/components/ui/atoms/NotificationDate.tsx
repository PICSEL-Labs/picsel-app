import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  date: string;
}

const NotificationDate = ({ date }: Props) => {
  return (
    <View className="p-1 px-4">
      <Text className="text-gray-600 body-rg-02">{date}</Text>
    </View>
  );
};

export default NotificationDate;
