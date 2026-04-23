import React, { ReactNode, useEffect, useState } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

import { useUserConfig } from '@/shared/hooks/useUserConfig';
import { useLocationStore } from '@/shared/store';
import Toast from '@/shared/ui/atoms/Toast';
import ActionSheet from '@/shared/ui/molecules/ActionSheet';
import BrandFilterSheet from '@/shared/ui/molecules/BrandFilterSheet';
import ConfirmModal from '@/shared/ui/molecules/ConfirmModal';

interface AppProviderProps {
  children: ReactNode;
}

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppProvider = ({ children }: AppProviderProps) => {
  // Text 적용 : 시스템 폰트 크기를 무시하고 앱에서 지정한 크기를 사용함.
  (Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;

  // TextInput 적용 : 시스템 폰트 크기를 앱에서 지정
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
    (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
  (
    TextInput as unknown as TextInputWithDefaultProps
  ).defaultProps!.allowFontScaling = false;

  useUserConfig();

  const fetchUserLocation = useLocationStore(state => state.fetchUserLocation);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 3000));
      try {
        await fetchUserLocation();
      } catch (e) {
        console.warn('위치 정보를 불러올 수 없습니다.', e);
      }
      await delay;
      setIsReady(true);
      SplashScreen.hide();

      if (Platform.OS === 'ios') {
        requestTrackingPermission();
      }
    };
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            {children}
            {/* Global UI Components */}
            <Toast />
            <ConfirmModal />
            <ActionSheet />
            <BrandFilterSheet />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
