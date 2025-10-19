import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import { useCameraPermission } from '@/feature/qr/hooks/useCameraPermission';
import QrScanOverlay from '@/feature/qr/ui/organisms/QrScanOverlay';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import NotchBackground from '@/shared/ui/atoms/NotchBackground';

const QrScanScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const device = useCameraDevice('back');
  const permission = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async codes => {
      const url = codes?.[0]?.value;
      if (!url) {
        return;
      }

      navigation.navigate('QrPreview', { url });
    },
  });

  if (!permission) {
    return (
      <ScreenLayout>
        <Text>카메라 권한이 필요합니다.</Text>
      </ScreenLayout>
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
