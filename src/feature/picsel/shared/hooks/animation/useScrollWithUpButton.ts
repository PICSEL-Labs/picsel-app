import { useCallback, useRef, useState } from 'react';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

interface UseScrollWithUpButtonReturn {
  showUpButton: boolean;
  flatListRef: React.RefObject<FlatList>;
  scrollViewRef: React.RefObject<ScrollView>;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollToTop: () => void;
}

interface UseScrollWithUpButtonOptions {
  threshold?: number;
  useScrollView?: boolean;
}

export const useScrollWithUpButton = (
  options: UseScrollWithUpButtonOptions = {},
): UseScrollWithUpButtonReturn => {
  const { threshold = 100, useScrollView = false } = options;
  const [showUpButton, setShowUpButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrollingToTop = useRef(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;

      if (isScrollingToTop.current) {
        if (offsetY <= 0) {
          isScrollingToTop.current = false;
        }
        return;
      }

      setShowUpButton(offsetY > threshold);
    },
    [threshold],
  );

  const scrollToTop = useCallback(() => {
    isScrollingToTop.current = true;
    setShowUpButton(false);
    if (useScrollView) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [useScrollView]);

  return {
    showUpButton,
    flatListRef,
    scrollViewRef,
    handleScroll,
    scrollToTop,
  };
};
