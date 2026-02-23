import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import NotificationBody from '@/feature/mypage/notification/components/ui/atoms/NotificationBody';
import NotificationDate from '@/feature/mypage/notification/components/ui/atoms/NotificationDate';
import NotificationTitle from '@/feature/mypage/notification/components/ui/atoms/NotificationTitle';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { MypageNavigationProps } from '@/navigation/route/mypage';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const NotificationDetailScreen = () => {
  const route =
    useRoute<RouteProp<MypageNavigationProps, 'NotificationDetailScreen'>>();
  const { title, date, content } = route.params.notification;

  return (
    <ScreenLayout>
      <MypageHeader title={title} />
      <NotificationDate date={date} />
      <NotificationTitle title={title} />
      <NotificationBody content={content} />
    </ScreenLayout>
  );
};

export default NotificationDetailScreen;
