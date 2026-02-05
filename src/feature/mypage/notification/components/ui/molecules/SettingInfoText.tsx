import React from 'react';

import { View, Text } from 'react-native';

import SparkleIcons from '@/shared/icons/SparkleIcons';

const SettingInfoText = () => {
  return (
    <View className="flex flex-row p-4">
      <View className="bottom-0.5">
        <SparkleIcons shape="on" width={29} height={29} />
      </View>
      <Text className="text-gray-900 body-rg-02">
        알림이 오지 않는 경우 휴대폰 설정 &gt; 알림 &gt; 픽셀에서{'\n'}설정을
        변경해주세요.
      </Text>
    </View>
  );
};

export default SettingInfoText;
