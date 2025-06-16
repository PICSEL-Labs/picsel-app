import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupSuccessScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FF6C9A] w-full h-full">
      <View className="flex-1 justify-center items-center gap-10">
        <Text className="text-center text-[24px] font-semibold text-[#FFFFFF] leading-[36px]">
          이제부터 당신은 픽셀러!{'\n'}세상의 모든 포토부스{'\n'}즐기러
          가볼까요?
        </Text>
        <View className="bg-[#D9D9D9] w-[200px] h-[200px]" />
      </View>

      <View className="items-center">
        <Pressable className="bg-white w-[330px] h-[56px] rounded-[40px] mb-[20px] justify-center items-center">
          <Text className="text-[#FF6C9A] font-semibold text-[20px]">
            시작하기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupSuccessScreen;
