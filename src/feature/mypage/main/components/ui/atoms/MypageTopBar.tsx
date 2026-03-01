import React from 'react';

import { Pressable, View } from 'react-native';

import BellIcons from '@/shared/icons/BellIcons';
import MypageIcons from '@/shared/icons/MypageIcons';

interface Props {
  onPressNotification: () => void;
  onPressSetting: () => void;
  hasUnread: boolean;
}

const MypageTopBar = ({
  onPressNotification,
  onPressSetting,
  hasUnread,
}: Props) => {
  return (
    <View
      className="flex h-11 w-full flex-row items-center justify-end px-4"
      style={{ gap: 16 }}>
      <Pressable onPress={onPressNotification}>
        <BellIcons shape={hasUnread ? 'on' : 'off'} width={24} height={24} />
      </Pressable>

      <Pressable onPress={onPressSetting}>
        <MypageIcons shape="setting" width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default MypageTopBar;
