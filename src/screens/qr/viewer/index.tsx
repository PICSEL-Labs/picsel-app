import React, { useRef } from 'react';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import QrViewerHeader from '@/feature/qr/ui/layout/QrViewerHeader';
import { MainNavigationProps } from '@/navigation';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import Button from '@/shared/ui/atoms/Button';

type QrPreviewRouteProp = RouteProp<MainNavigationProps, 'QrViewer'>;

interface Props {
  route: QrPreviewRouteProp;
}

const QrViewerScreen = ({ route }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const webViewRef = useRef<WebView>(null);

  const { url } = route.params || {};

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  return (
    <ScreenLayout>
      <QrViewerHeader
        onBack={() => navigation.goBack()}
        onRefresh={handleRefresh}
      />

      <View className="flex-1">
        <WebView ref={webViewRef} source={{ uri: url }} style={{ flex: 1 }} />
      </View>

      <View className="px-4 py-3">
        <Button
          text="다음"
          color="active"
          textColor="white"
          className="w-full"
        />
      </View>
    </ScreenLayout>
  );
};

export default QrViewerScreen;
