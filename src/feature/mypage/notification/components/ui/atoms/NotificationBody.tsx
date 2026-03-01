import React from 'react';

import { ScrollView, Text, View } from 'react-native';

interface Props {
  content: string;
}

const NotificationBody = ({ content }: Props) => {
  return (
    <ScrollView
      className="mt-4 flex-1 px-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="self-stretch">
        {content ? (
          <Text className="text-gray-900 body-rg-03">{content}</Text>
        ) : (
          <Text className="text-gray-300 body-rg-03">(내용 없음)</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default NotificationBody;
