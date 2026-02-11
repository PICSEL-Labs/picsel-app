import React from 'react';

import { Pressable, Text } from 'react-native';

import TeamIntroIcons from '@/shared/icons/TeamIntroIcons';

interface Props {
  onPress: () => void;
}

const TeamFooter = ({ onPress }: Props) => {
  return (
    <Pressable
      className="mt-6 flex-1 flex-row items-center justify-center space-x-1 pt-36"
      onPress={onPress}>
      <TeamIntroIcons shape="instagram" width={24} height={24} />
      <Text className="text-white body-rg-01">픽셀 인스타그램 바로가기</Text>
    </Pressable>
  );
};

export default TeamFooter;
