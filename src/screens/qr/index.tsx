import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

import { useCameraPermission } from '@/feature/qr/hooks/useCameraPermission';
import QrScanOverlay from '@/feature/qr/ui/organisms/QrScanOverlay';
import NotchBackground from '@/shared/ui/atoms/NotchBackground';

const QrScreen = () => {
  const device = useCameraDevice('back');
  const permission = useCameraPermission();

  if (!permission) {
    return (
      <SafeAreaView className="flex-1">
        <Text>카메라 권한이 필요합니다.</Text>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView className="flex-1">
        <QrScanOverlay />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* iOS 노치 영역 배경색 설정 */}
      <NotchBackground color="rgba(17, 17, 20, 0.4)" />

      {/* 카메라 */}
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}

      {/* 오버레이 UI */}
      <QrScanOverlay />
    </SafeAreaView>
  );
};

export default QrScreen;
