import { useEffect, useRef } from 'react';

import { AppState } from 'react-native';

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
    withdraw();
  };

  return {
    handleComplete,
  };
};
