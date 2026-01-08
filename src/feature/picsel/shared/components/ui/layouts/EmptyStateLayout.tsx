import React, { Fragment, ReactNode } from 'react';

import { View } from 'react-native';

interface Props {
  children: ReactNode;
  floatingButton: ReactNode;
}

const EmptyStateLayout = ({ children, floatingButton }: Props) => {
  return (
    <Fragment>
      {children}
      <View className="absolute -bottom-4 right-4 space-y-5">
        {floatingButton}
      </View>
    </Fragment>
  );
};

export default EmptyStateLayout;
