import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupSuccessScreen = () => {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-[#FF6C9A]">
      <View className="flex-1 items-center justify-center gap-10">
        <Text className="text-center text-[24px] font-semibold leading-[36px] text-[#FFFFFF]">
          이제부터 당신은 픽셀러!{'\n'}세상의 모든 포토부스{'\n'}즐기러
          가볼까요?
        </Text>
        <View className="h-[200px] w-[200px] bg-[#D9D9D9]" />
      </View>

      <View className="items-center">
        <Pressable className="mb-[20px] h-[56px] w-[330px] items-center justify-center rounded-[40px] bg-white">
          <Text className="text-[20px] font-semibold text-[#FF6C9A]">
            시작하기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupSuccessScreen;
