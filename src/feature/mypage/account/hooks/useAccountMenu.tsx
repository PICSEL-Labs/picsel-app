import React from 'react';

import ArrowIcons from '@/shared/icons/ArrowIcons';

export const useAccountMenu = () => {
  // const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = () => {
    console.log('로그아웃');
    // 로그아웃 로직
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
