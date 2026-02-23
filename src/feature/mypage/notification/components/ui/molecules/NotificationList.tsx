import React from 'react';

import { View } from 'react-native';

import { Notification } from '../../../types';
import NotificationItem from '../atoms/NotificationItem';

interface Props {
  notifications: Notification[];
  onPressItem: (notification: Notification) => void;
}

const NotificationList = ({ notifications, onPressItem }: Props) => {
  return (
    <View className="flex flex-col px-4">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          isLast={index === notifications.length - 1}
          onPress={() => onPressItem?.(notification)}
        />
      ))}
    </View>
  );
};

export default NotificationList;
