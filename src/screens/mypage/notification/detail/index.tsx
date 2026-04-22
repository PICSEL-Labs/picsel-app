import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import NotificationBody from '@/feature/mypage/notification/components/ui/atoms/NotificationBody';
import NotificationDate from '@/feature/mypage/notification/components/ui/atoms/NotificationDate';
import NotificationTitle from '@/feature/mypage/notification/components/ui/atoms/NotificationTitle';
import { useGetNotificationDetail } from '@/feature/mypage/notification/queries/useGetNotificationDetail';
import { formatISOToDate } from '@/feature/mypage/notification/utils/formatDate';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import { MypageNavigationProps } from '@/navigation/route/mypage';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const NotificationDetailScreen = () => {
  const route =
    useRoute<RouteProp<MypageNavigationProps, 'NotificationDetailScreen'>>();
  const { notificationId } = route.params;

  const { data, isLoading } = useGetNotificationDetail(notificationId);

  return (
    <ScreenLayout edges={['top']}>
      <MypageHeader title={data?.title ?? '알림'} />

      {isLoading || !data ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <View className="flex-1">
          <NotificationDate date={formatISOToDate(data.publishedAt)} />
          <NotificationTitle title={data.title} />
          <NotificationBody content={data.body} />
        </View>
      )}
    </ScreenLayout>
  );
};

export default NotificationDetailScreen;
