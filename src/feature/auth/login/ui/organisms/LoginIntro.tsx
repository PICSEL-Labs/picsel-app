import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import SparkleImages from '@/shared/images/Sparkle';

const LoginIntro = () => {
  return (
    <View className="flex-1 items-center px-4">
      <View className="items-center pt-14">
        <View className="mb-3 mr-10 flex-row items-end gap-[10px] self-center">
          <Text className="text-pink-100 headline-05">포토부스</Text>
          <View>
            <View className="absolute -top-[29px] right-[55px]">
              <SparkleImages shape="icon" width={32} height={36} />
            </View>
            <Text style={styles.highlightText} className="text-pink-500">
              검색
            </Text>
          </View>
          <Text className="text-pink-100 headline-05">부터</Text>
        </View>

        <View className="-mr-8 flex-row items-end gap-[10px]">
          <Text className="text-pink-100 headline-05">네컷사진</Text>
          <View>
            <View className="absolute -top-[12px] right-[-14px]">
              <SparkleImages shape="icon-one" width={24} height={24} />
            </View>
            <Text style={styles.highlightText} className="text-pink-500">
              보관
            </Text>
          </View>
          <Text className="text-pink-100 headline-05">까지</Text>
        </View>
      </View>
      <View className="flex-1 items-center justify-center">
        <SparkleImages shape="bg" width={340} height={418} />
      </View>
    </View>
  );
};

// NativeWind에 32px ExtraBold 타이포 유틸리티가 없어 StyleSheet로 정의
const styles = StyleSheet.create({
  highlightText: {
    fontSize: 32,
    lineHeight: 44.8,
    fontFamily: 'NanumSquareRoundEB',
  },
});

export default LoginIntro;
