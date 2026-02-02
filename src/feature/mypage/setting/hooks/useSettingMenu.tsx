import { useCallback } from 'react';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { SETTING_MENU_ITEMS } from '../constants/settingMenuItems';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import BellIcons from '@/shared/icons/BellIcons';
import MypageIcons from '@/shared/icons/MypageIcons';

const getIconByType = (iconType?: string) => {
  switch (iconType) {
    case 'account':
      return <MypageIcons shape="my" width={24} height={24} />;
    case 'notification':
      return <BellIcons shape="off" width={24} height={24} />;
    case 'terms':
      return <MypageIcons shape="file" width={24} height={24} />;
    case 'privacy':
      return <MypageIcons shape="info-circle" width={24} height={24} />;
    default:
      return null;
  }
};

export const useSettingMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleAccountManage = useCallback(() => {
    navigation.navigate('MypageAccount');
  }, []);

  const handleNotificationSetting = useCallback(() => {
    console.log('알림 설정');
    // navigation.navigate('NotificationSetting');
  }, []);

  const handleTerms = useCallback(() => {
    console.log('이용약관');
    // navigation.navigate('Terms'); or Linking 처리
  }, []);

  const handlePrivacy = useCallback(() => {
    console.log('개인정보처리방침');
    // navigation.navigate('Privacy'); or Linking 처리
  }, []);

  const menuItems = SETTING_MENU_ITEMS.map(item => {
    let onPress = () => {};

    switch (item.id) {
      case '1':
        onPress = handleAccountManage;
        break;
      case '2':
        onPress = handleNotificationSetting;
        break;
      case '3':
        onPress = handleTerms;
        break;
      case '4':
        onPress = handlePrivacy;
        break;
    }

    return {
      ...item,
      onPress,
      leftIcon: getIconByType(item.iconType),
      rightIcon: item.hasRightArrow ? (
        <ArrowIcons shape="next" width={24} height={24} />
      ) : null,
    };
  });

  return { menuItems };
};
