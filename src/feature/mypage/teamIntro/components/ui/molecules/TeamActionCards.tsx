import React from 'react';

import { Pressable, Text, View } from 'react-native';

import { TEAM_ACTION_CARDS_TEXT } from '../../../constants/teamIntroTexts';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import TeamIntroIcons from '@/shared/icons/TeamIntroIcons';

interface Props {
  onIntroduce: () => void;
}

const TeamActionCards = ({ onIntroduce }: Props) => {
  return (
    <View className="flex w-full flex-row space-x-2">
      <Pressable
        className="flex-1 rounded-xl bg-white px-3 py-4"
        onPress={onIntroduce}>
        <View className="flex-row items-center space-x-1">
          <TeamIntroIcons shape="star" width={24} height={24} />
          <Text className="text-gray-900 body-rg-01">
            {TEAM_ACTION_CARDS_TEXT.SUBTITLE}
          </Text>
        </View>
        <View className="mt-1 flex-row items-center">
          <Text className="top-[0.5px] text-gray-900 headline-01">
            {TEAM_ACTION_CARDS_TEXT.TITLE}
          </Text>
          <ArrowIcons shape="next" width={24} height={24} />
        </View>
      </Pressable>
    </View>
  );
};

export default TeamActionCards;
