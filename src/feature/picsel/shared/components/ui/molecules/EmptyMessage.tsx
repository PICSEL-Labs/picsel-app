import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  message: string;
  breakAtComma?: boolean;
}

const EmptyMessage = ({ message, breakAtComma = false }: Props) => {
  const displayMessage = breakAtComma ? message.replace(',', ',\n') : message;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center text-gray-900 headline-04">
        {displayMessage}
      </Text>
    </View>
  );
};

export default EmptyMessage;
