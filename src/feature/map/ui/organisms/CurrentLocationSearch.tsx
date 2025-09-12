import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ReplayIcons from '@/shared/icons/ReplayIcon';
import { defaultShadow } from '@/styles/shadows';

interface Props {
  onLocationSearch: () => void;
}

const CurrentLocationSearch = ({ onLocationSearch }: Props) => {
  return (
    <View>
      <Pressable
        className="mt-1 h-[40px] w-[149px] flex-shrink-0 flex-row items-center justify-center self-center rounded-[27px] bg-neutral-white"
        onPress={onLocationSearch}
        style={defaultShadow}>
        <ReplayIcons height={24} width={24} shape="default" />
        <Text className="ml-1 text-semantic-info body-rg-02">
          현 지도에서 검색
        </Text>
      </Pressable>
    </View>
  );
};

export default CurrentLocationSearch;
