import React from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  EmptyNotification,
  NotificationList,
  MOCK_NOTIFICATIONS,
} from '@/feature/mypage/notification';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import MypageIcons from '@/shared/icons/MypageIcons';

const NotificationScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // TODO: 실제 알림 데이터로 교체
  const notifications = MOCK_NOTIFICATIONS;
  const hasNotifications = notifications.length > 0;

  return (
    <ScreenLayout>
      <MypageHeader
        title="알림"
        rightIconPress={() => navigation.navigate('NotificationSettingScreen')}
        rightElement={<MypageIcons shape="setting" width={24} height={24} />}
      />

      {hasNotifications ? (
        <NotificationList notifications={notifications} />
      ) : (
        <EmptyNotification />
      )}
    </ScreenLayout>
  );
};

export default NotificationScreen;
