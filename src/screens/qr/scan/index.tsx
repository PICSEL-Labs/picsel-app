import React, { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

import { useCameraPermission } from '@/feature/qr/hooks/useCameraPermission';
import { useQrScanner } from '@/feature/qr/hooks/useQrScanner';
import QrScanOverlay from '@/feature/qr/ui/organisms/QrScanOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import NotchBackground from '@/shared/ui/atoms/NotchBackground';

const QrScanScreen = () => {
  const device = useCameraDevice('back');
  const permission = useCameraPermission();

  const { codeScanner, resetScan } = useQrScanner();

  useFocusEffect(
    useCallback(() => {
      resetScan(); // QR 화면에 다시 focus되면 스캔 초기화
    }, [resetScan]),
  );

  if (!device || !permission) {
    return (
      <SafeAreaView className="flex-1">
        <QrScanOverlay />
      </SafeAreaView>
    );
  }

  return (
    <ScreenLayout>
      {/* iOS 노치 영역 배경색 설정 */}
      <NotchBackground color="rgba(17, 17, 20, 0.4)" />

      {/* 카메라 */}
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}

      {/* 오버레이 UI */}
      <QrScanOverlay />
    </ScreenLayout>
  );
};

export default QrScanScreen;
