import React from 'react';

import { View } from 'react-native';

import { NotificationPreview } from '../../../types';
import NotificationItem from '../atoms/NotificationItem';

interface Props {
  notifications: NotificationPreview[];
  onPressItem: (notification: NotificationPreview) => void;
}

const NotificationList = ({ notifications, onPressItem }: Props) => {
  return (
    <View className="flex flex-col px-4">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.notificationId}
          notification={notification}
          isLast={index === notifications.length - 1}
          onPress={() => onPressItem?.(notification)}
        />
      ))}
    </View>
  );
};

export default NotificationList;
