import { useCallback, useRef, useState } from 'react';

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

export const useHandleScroll = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const showFloatingRef = useRef(false);

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const isScrollable = contentSize.height > layoutMeasurement.height;
      const isScrolled = contentOffset.y > 100;
      const shouldShow = isScrollable && isScrolled;

      if (shouldShow && !showFloatingRef.current) {
        showFloatingRef.current = true;
        setShowFloatingButton(true);
      }
      if (!shouldShow && showFloatingRef.current) {
        showFloatingRef.current = false;
        setShowFloatingButton(false);
      }
    },
    [],
  );

  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return { showFloatingButton, handleScroll, scrollToTop, scrollViewRef };
};
