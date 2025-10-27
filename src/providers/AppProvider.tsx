import React, { ReactNode } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useSplashScreen } from '@/shared/hooks/useSplashScreen';
import { useUserConfig } from '@/shared/hooks/useUserConfig';

interface AppProviderProps {
  children: ReactNode;
}

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

const queryClient = new QueryClient({
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

  useSplashScreen();
  useUserConfig();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
