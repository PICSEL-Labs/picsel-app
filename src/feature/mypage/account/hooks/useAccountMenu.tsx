import { useCallback } from 'react';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { showConfirmModal } from '@/shared/lib/confirmModal';
import { useUserStore } from '@/shared/store';

export const useAccountMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { logout } = useUserStore();

  const executeLogout = useCallback(() => {
    logout();
  }, [logout, navigation]);

  const handleLogout = () => {
    showConfirmModal('', executeLogout, {
      title: '로그아웃 할까요?',
      confirmText: '로그아웃',
      cancelText: '취소',
    });
  };

  const handleWithdraw = () => {
    console.log('탈퇴하기');
    // navigation.navigate('Withdraw');
  };

  const accountMenuItems = [
    {
      id: '1',
      label: '로그아웃',
      onPress: handleLogout,
      rightIcon: <ArrowIcons shape="next" width={24} height={24} />,
    },
    {
      id: '2',
      label: '탈퇴하기',
      onPress: handleWithdraw,
      rightIcon: <ArrowIcons shape="next" width={24} height={24} />,
    },
  ];

  return { accountMenuItems };
};
