import React from 'react';

import { Pressable, View, Text } from 'react-native';

import { NotificationPreview } from '../../../types';
import { formatISOToDate } from '../../../utils/formatDate';

import SparkleIcons from '@/shared/icons/SparkleIcons';

interface Props {
  notification: NotificationPreview;
  isLast?: boolean;
  onPress?: () => void;
}

const NotificationItem = ({ notification, isLast = false, onPress }: Props) => {
  const { title, bodyPreview, publishedAt, isRead } = notification;

  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-row space-x-1 self-stretch py-3 ${
        !isLast ? 'border-b border-b-gray-50' : ''
      }`}>
      <SparkleIcons shape="double" width={40} height={40} />
      <View className="flex flex-1 space-y-1">
        <Text
          className={`headline-02 ${isRead ? 'text-gray-400' : 'text-gray-900'}`}>
          {title}
        </Text>
        {bodyPreview ? (
          <Text
            className={`body-rg-02 ${isRead ? 'text-gray-400' : 'text-gray-900'}`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {bodyPreview}
          </Text>
        ) : null}
        <Text className="text-gray-600 body-rg-02">
          {formatISOToDate(publishedAt)}
        </Text>
      </View>
    </Pressable>
  );
};

export default NotificationItem;
