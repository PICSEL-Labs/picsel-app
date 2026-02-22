import React from 'react';

import { Pressable, View, Text } from 'react-native';

import { Notification } from '../../../types';

import SparkleIcons from '@/shared/icons/SparkleIcons';

interface Props {
  notification: Notification;
  isLast?: boolean;
  onPress?: () => void;
}

const NotificationItem = ({ notification, isLast = false, onPress }: Props) => {
  const { title, description, date } = notification;

  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-row space-x-1 self-stretch py-3 ${
        !isLast ? 'border-b border-b-gray-50' : ''
      }`}>
      <SparkleIcons shape="double" width={40} height={40} />
      <View className="flex flex-1 space-y-1">
        <Text className="text-gray-900 headline-02">{title}</Text>
        {description && (
          <Text
            className="text-gray-900 body-rg-02"
            numberOfLines={1}
            ellipsizeMode="tail">
            {description}
          </Text>
        )}
        <Text className="text-gray-600 body-rg-02">{date}</Text>
      </View>
    </Pressable>
  );
};

export default NotificationItem;
