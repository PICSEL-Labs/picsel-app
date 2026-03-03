import React, { useCallback } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
  EmptyNotification,
  NotificationList,
} from '@/feature/mypage/notification';
import { useGetNotifications } from '@/feature/mypage/notification/queries/useGetNotifications';
import { NotificationPreview } from '@/feature/mypage/notification/types';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { MypageNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import MypageIcons from '@/shared/icons/MypageIcons';

const NotificationScreen = () => {
  const navigation = useNavigation<MypageNavigationProp>();
  const { data: notifications = [], refetch } = useGetNotifications();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const hasNotifications = notifications.length > 0;

  const handlePressItem = (notification: NotificationPreview) => {
    navigation.navigate('NotificationDetailScreen', {
      notificationId: notification.notificationId,
    });
  };

  return (
    <ScreenLayout>
      <MypageHeader
        title="알림"
        rightIconPress={() => navigation.navigate('NotificationSettingScreen')}
        rightElement={<MypageIcons shape="setting" width={24} height={24} />}
      />

      {hasNotifications ? (
        <NotificationList
          notifications={notifications}
          onPressItem={handlePressItem}
        />
      ) : (
        <EmptyNotification />
      )}
    </ScreenLayout>
  );
};

export default NotificationScreen;
