import { useRef, useState } from 'react';

import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const useHandleScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const isTop = contentOffset.y <= 0;
    const isScrolled = contentOffset.y > 100;

    if (isScrolled && !showFloatingButton) {
      setShowFloatingButton(true);
    }
    if (isTop && showFloatingButton) {
      setShowFloatingButton(false);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return { showFloatingButton, handleScroll, scrollToTop, scrollViewRef };
};
