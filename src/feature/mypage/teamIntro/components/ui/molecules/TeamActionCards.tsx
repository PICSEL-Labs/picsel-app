import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import TeamIntroIcons from '@/shared/icons/TeamIntroIcons';

interface Props {
  onDonation: () => void;
  onIntroduce: () => void;
}

const TeamActionCards = ({ onDonation, onIntroduce }: Props) => {
  return (
    <View className="flex w-full flex-row space-x-2">
      <Pressable
        className="flex-1 rounded-xl bg-pink-300 px-3 py-4"
        onPress={onDonation}>
        <View className="flex-row items-center space-x-1">
          <TeamIntroIcons shape="heart" width={24} height={24} />
          <Text className="text-primary-pink body-rg-01">개발자 응원하기</Text>
        </View>
        <View className="mt-1 flex-row items-center">
          <Text className="top-[0.5px] text-primary-pink headline-01">
            후원하기
          </Text>
          <ArrowIcons shape="next-pink" width={24} height={24} />
        </View>
      </Pressable>
      <Pressable
        className="flex-1 rounded-xl bg-white px-3 py-4"
        onPress={onIntroduce}>
        <View className="flex-row items-center space-x-1">
          <TeamIntroIcons shape="star" width={24} height={24} />
          <Text className="text-gray-900 body-rg-01">Picsel 소개 페이지</Text>
        </View>
        <View className="mt-1 flex-row items-center">
          <Text className="top-[0.5px] text-gray-900 headline-01">
            구경하러 가기
          </Text>
          <ArrowIcons shape="next" width={24} height={24} />
        </View>
      </Pressable>
    </View>
  );
};

export default TeamActionCards;
