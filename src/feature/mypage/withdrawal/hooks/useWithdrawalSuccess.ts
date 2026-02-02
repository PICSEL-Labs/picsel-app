import { useEffect, useRef } from 'react';

import { AppState } from 'react-native';

import { useUserStore } from '@/shared/store';

export const useWithdrawalSuccess = () => {
  const { logout } = useUserStore();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    return () => {
      if (!hasLoggedOut.current) {
        logout();
      }
    };
  }, [logout]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (!hasLoggedOut.current) {
          logout();
          hasLoggedOut.current = true;
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [logout]);

  const handleComplete = () => {
    hasLoggedOut.current = true;
    logout();
  };

  return {
    handleComplete,
  };
};
