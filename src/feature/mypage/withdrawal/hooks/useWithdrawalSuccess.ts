import { useEffect, useRef } from 'react';

import { AppState } from 'react-native';

import { clearUserData } from '@/shared/lib/clearUserData';
import { useUserStore } from '@/shared/store';

export const useWithdrawalSuccess = () => {
  const { withdraw } = useUserStore();
  const hasWithdrawn = useRef(false);

  useEffect(() => {
    return () => {
      if (!hasWithdrawn.current) {
        withdraw();
      }
    };
  }, [withdraw]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (!hasWithdrawn.current) {
          withdraw();
          hasWithdrawn.current = true;
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [withdraw]);

  const handleComplete = () => {
    hasWithdrawn.current = true;
    clearUserData();
    withdraw();
  };

  return {
    handleComplete,
  };
};
