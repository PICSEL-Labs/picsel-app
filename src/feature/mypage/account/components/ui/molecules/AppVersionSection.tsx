import React from 'react';

import { Text, View } from 'react-native';

interface Props {
  version: string;
  isLatest?: boolean;
}

const AppVersionSection = ({ version, isLatest = true }: Props) => {
  return (
    <View className="flex flex-col items-start self-stretch px-4 pt-6">
      <Text className="pb-2 text-gray-900 headline-02">앱 버전</Text>
      <View className="flex flex-row items-center justify-between self-stretch rounded-xl bg-gray-50 py-4 pl-5 pr-4">
        <Text className="text-gray-600 headline-01">
          {version} {isLatest ? '(최신버전)' : '(업데이트 필요)'}
        </Text>
      </View>
    </View>
  );
};

export default AppVersionSection;
