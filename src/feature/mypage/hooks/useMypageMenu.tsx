import { useCallback } from 'react';
import React from 'react';

import { MYPAGE_MENU_ITEMS } from '../constants/menuItems';

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
  // const navigation = useNavigation<RootStackNavigationProp>();

  const handleNotice = useCallback(() => {
    console.log('공지사항');
  }, []);

  const handleInquiry = useCallback(() => {
    console.log('문의사항');
  }, []);

  const handleTeamIntro = useCallback(() => {
    console.log('픽셀 팀원 소개');
  }, []);

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
