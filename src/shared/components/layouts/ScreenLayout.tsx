import React from 'react';

import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: React.ReactNode;
}

const ScreenLayout = ({ children, ...rest }: Props) => {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-white" {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
