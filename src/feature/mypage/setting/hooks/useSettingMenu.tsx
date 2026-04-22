import { useCallback } from 'react';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

import {
  EXTERNAL_LINKS,
  SETTING_MENU_ITEMS,
} from '../constants/settingMenuItems';

import { MypageNavigationProp } from '@/navigation/types/navigateTypeUtil';
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
  const navigation = useNavigation<MypageNavigationProp>();

  const handleAccountManage = useCallback(() => {
    navigation.navigate('MypageAccount');
  }, []);

  const handleNotificationSetting = useCallback(() => {
    navigation.navigate('NotificationSettingScreen');
  }, []);

  const handleTerms = useCallback(() => {
    Linking.openURL(EXTERNAL_LINKS.terms);
  }, []);

  const handlePrivacy = useCallback(() => {
    Linking.openURL(EXTERNAL_LINKS.privacy);
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
