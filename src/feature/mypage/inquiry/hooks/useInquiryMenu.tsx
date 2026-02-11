import React, { useCallback } from 'react';

import { Linking } from 'react-native';

import { INQUIRY_MENU_ITEMS } from '../constants/inquiryMenuItems';

import { EXTERNAL_LINKS } from '@/feature/mypage/setting/constants/settingMenuItems';
import ArrowIcons from '@/shared/icons/ArrowIcons';

export const useInquiryMenu = () => {
  const handleFaq = useCallback(() => {
    if (EXTERNAL_LINKS.faq) {
      Linking.openURL(EXTERNAL_LINKS.faq);
    }
  }, []);

  const handleInquiry = useCallback(() => {
    Linking.openURL(EXTERNAL_LINKS.inquiry);
  }, []);

  const menuItems = INQUIRY_MENU_ITEMS.map(item => {
    let onPress = () => {};

    switch (item.id) {
      case '1':
        onPress = handleFaq;
        break;
      case '2':
        onPress = handleInquiry;
        break;
    }

    return {
      ...item,
      onPress,
      rightIcon: <ArrowIcons shape="next" width={24} height={24} />,
    };
  });

  return { menuItems };
};
