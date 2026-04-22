import React from 'react';

import { ViewProps } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: React.ReactNode;
  edges?: Edge[];
}

const ScreenLayout = ({ children, edges, ...rest }: Props) => {
  return (
    <SafeAreaView
      className="h-full w-full flex-1 bg-white"
      edges={edges}
      {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
