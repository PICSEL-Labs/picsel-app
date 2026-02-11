import { useCallback, useEffect, useRef, useState } from 'react';

import { Keyboard, ScrollView } from 'react-native';

interface UseKeyboardEventOptions {
  scrollToEndOnFocus?: boolean;
  scrollDelay?: number;
}

export const useKeyboardEvent = (options?: UseKeyboardEventOptions) => {
  const { scrollToEndOnFocus = false, scrollDelay = 100 } = options ?? {};
  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', () =>
      setIsKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardWillHide', () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleFocusInput = useCallback(() => {
    if (!scrollToEndOnFocus) {
      return;
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, scrollDelay);
  }, [scrollToEndOnFocus, scrollDelay]);

  return { scrollViewRef, isKeyboardVisible, handleFocusInput };
};
