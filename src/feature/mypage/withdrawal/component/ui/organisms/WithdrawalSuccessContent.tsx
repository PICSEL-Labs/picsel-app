import React from 'react';

import { Text, View } from 'react-native';

const WithdrawalSuccessContent = () => {
  return (
    <View className="flex-1 px-4 pt-[52px]">
      <Text className="text-gray-900 title-05">탈퇴가 완료됐어요</Text>

      <View className="pt-4">
        <Text className="text-gray-900 headline-02">
          그동안 픽셀을 이용해주셔서 감사합니다.{'\n'}떠나신다니 아쉬워요.
          {'\n'}다음에 또 만날 수 있기를 바랄게요!
        </Text>
      </View>
    </View>
  );
};

export default WithdrawalSuccessContent;
