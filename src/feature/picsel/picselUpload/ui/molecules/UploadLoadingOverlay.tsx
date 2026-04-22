import React from 'react';

import { Modal, Text, View } from 'react-native';

import GradientSpinner from '@/shared/ui/atoms/GradientSpinner';

const UploadLoadingOverlay = () => {
  return (
    <Modal transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-[#11111450]">
        <GradientSpinner />
        <Text className="mt-2 text-white headline-02">업로드 중..</Text>
      </View>
    </Modal>
  );
};

export default UploadLoadingOverlay;
