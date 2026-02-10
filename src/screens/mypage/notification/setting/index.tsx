import React, { useState } from 'react';

import { View } from 'react-native';

import {
  SettingMenuList,
  SettingInfoText,
} from '@/feature/mypage/notification';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

// TODO: 유저 권한 설정 필요 -> PM & UI 구현 끝나면 진행
const NotificationSettingScreen = () => {
  const [isPicselNewsEnabled, setIsPicselNewsEnabled] = useState(true);
  const [isEventNewsEnabled, setIsEventNewsEnabled] = useState(false);

  const settingItems = [
    {
      id: 'picsel-news',
      title: '픽셀 소식',
      description: '공지 및 서비스 관련 알림',
      value: isPicselNewsEnabled,
      onValueChange: setIsPicselNewsEnabled,
    },
    {
      id: 'event-news',
      title: '이벤트 소식',
      description: '이벤트 및 혜택 정보 알림',
      value: isEventNewsEnabled,
      onValueChange: setIsEventNewsEnabled,
    },
  ];

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
