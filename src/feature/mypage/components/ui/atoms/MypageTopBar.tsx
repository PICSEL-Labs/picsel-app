import React from 'react';

import { Pressable, View } from 'react-native';

import BellIcons from '@/shared/icons/BellIcons';
import MypageIcons from '@/shared/icons/MypageIcons';

interface Props {
  onPressNotification: () => void;
  onPressSetting: () => void;
}

const MypageTopBar = ({ onPressNotification, onPressSetting }: Props) => {
  return (
    <View
      className="flex h-11 w-full flex-row items-center justify-end px-4"
      style={{ gap: 16 }}>
      <Pressable onPress={onPressNotification}>
        {/* 알림 여부를 기반으로 on - off 설정 -> 기획 및 기능 명세 필요 */}
        <BellIcons shape="on" width={24} height={24} />
      </Pressable>

      <Pressable onPress={onPressSetting}>
        <MypageIcons shape="setting" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default MypageTopBar;
