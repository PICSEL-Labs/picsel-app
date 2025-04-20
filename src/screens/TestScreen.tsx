import React from 'react';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = () => {
  return (
    <SafeAreaView className="bg-gray-300 flex-1 justify-center items-center">
      <Text className="text-blue-400">TestScreen</Text>
    </SafeAreaView>
  );
};

export default TestScreen;
