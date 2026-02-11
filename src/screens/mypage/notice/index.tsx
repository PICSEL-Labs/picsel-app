import React, { useState } from 'react';

import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

import { EXTERNAL_LINKS } from '@/feature/mypage/setting/constants/settingMenuItems';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const NoticeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScreenLayout>
      <MypageHeader title="공지사항" />
      <View className="flex-1">
        <WebView
          source={{ uri: EXTERNAL_LINKS.notice }}
          style={{ flex: 1 }}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#999999" />
          </View>
        )}
      </View>
    </ScreenLayout>
  );
};

export default NoticeScreen;
