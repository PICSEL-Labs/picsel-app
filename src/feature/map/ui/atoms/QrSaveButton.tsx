import React, { useState } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import QrIcons from '@/shared/icons/QrIcons';
import { defaultButtonShadow } from '@/styles/shadows';

const QrSaveButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    console.log('큐알 저장');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.5}
      style={defaultButtonShadow}
      className={`flex h-[56px] w-[343px] shrink-0 flex-row items-center justify-center space-x-2 rounded-[40px] px-6 py-4 text-center ${
        isPressed ? 'bg-pink-500' : 'bg-white'
      }`}>
      {/* qr white icon 필요 -> 디자인 파트 문의 */}
      <QrIcons shape={isPressed ? 'off-1' : 'on-1'} width={24} height={24} />
      <Text
        className={`headline-02 ${isPressed ? 'text-white' : 'text-pink-600'}`}>
        QR 사진 저장
      </Text>
    </TouchableOpacity>
  );
};

export default QrSaveButton;
