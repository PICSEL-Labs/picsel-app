import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { MYPAGE_MENU_ITEMS } from '../constants/menuItems';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import MypageIcons from '@/shared/icons/MypageIcons';

const getIconByType = (iconType?: string) => {
  switch (iconType) {
    case 'announcement':
      return <MypageIcons shape="announcement" width={24} height={24} />;
    case 'help':
      return <MypageIcons shape="help" width={24} height={24} />;
    case 'star':
      return <MypageIcons shape="star" width={24} height={24} />;
    default:
      return null;
  }
};

export const useMypageMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleNotice = () => {
    navigation.navigate('MypageRoute', { screen: 'NoticeScreen' });
  };

  const handleInquiry = () => {
    navigation.navigate('MypageRoute', { screen: 'InquiryScreen' });
  };

  const handleTeamIntro = () => {
    navigation.navigate('MypageRoute', { screen: 'TeamIntro' });
  };

  const menuItems = MYPAGE_MENU_ITEMS.map(item => {
    let onPress = () => {};

    switch (item.id) {
      case '1':
        onPress = handleNotice;
        break;
      case '2':
        onPress = handleInquiry;
        break;
      case '3':
        onPress = handleTeamIntro;
        break;
    }

    return {
      ...item,
      onPress,
      leftIcon: getIconByType(item.iconType),
    };
  });

  return { menuItems };
};
