import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';

interface Props {
  onBack: () => void;
  onRefresh: () => void;
}

const QrViewerHeader = ({ onBack, onRefresh }: Props) => {
  return (
    <View>
      <View className="relative flex-row items-center justify-center py-3">
        <Pressable className="absolute left-4" onPress={onBack}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>

        <Text className="text-gray-900 title-01">QR 사진</Text>

        <Pressable className="absolute right-4" onPress={onRefresh}>
          <ReplayIcons height={24} width={24} shape="dark" />
        </Pressable>
      </View>

      <View className="flex-row justify-center px-1 py-2">
        <Text className="text-gray-500 headline-01">
          픽셀북에 업로드할 사진을{' '}
          <Text className="text-pink-500">앨범에 저장</Text>해주세요!
        </Text>
      </View>
    </View>
  );
};

export default QrViewerHeader;
