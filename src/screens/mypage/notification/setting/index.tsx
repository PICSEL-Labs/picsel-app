import React from 'react';

import { View } from 'react-native';

import {
  SettingMenuList,
  SettingInfoText,
} from '@/feature/mypage/notification';
import { useSettingItems } from '@/feature/mypage/notification/hooks/useSettingItems';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const NotificationSettingScreen = () => {
  const { settingItems } = useSettingItems();

  return (
    <ScreenLayout>
      <MypageHeader title="알림 설정" />

      <SettingMenuList items={settingItems} />

      <View className="h-[6px] w-full bg-gray-50" />

      <SettingInfoText />
    </ScreenLayout>
  );
};

export default NotificationSettingScreen;
