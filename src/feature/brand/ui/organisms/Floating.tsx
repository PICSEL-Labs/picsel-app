import React from 'react';

import { Pressable } from 'react-native';

import FloatingButton from '@/shared/icons/FloatingButton';

interface Props {
  scrollToTop: () => void;
}

const Floating = ({ scrollToTop }: Props) => {
  return (
    <Pressable
      onPressIn={scrollToTop}
      className="absolute -top-12 right-6 items-center justify-center">
      <FloatingButton shape="floating" />
    </Pressable>
  );
};

export default Floating;
