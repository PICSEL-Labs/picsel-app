import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import CloseIcons from '@/shared/icons/CloseIcons';

interface Props {
  onBack: () => void;
  onClose: () => void;
}

const PhotoRegisterHeader = ({ onBack, onClose }: Props) => {
  return (
    <View>
      <View className="relative flex-row items-center justify-center py-2">
        <Pressable className="absolute left-4" onPress={onBack}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>

        <Text className="text-gray-900 title-01">픽셀 업로드</Text>

        <Pressable className="absolute right-4" onPress={onClose}>
          <CloseIcons height={24} width={24} shape="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default PhotoRegisterHeader;
