import { useCallback } from 'react';

import { MYPAGE_MENU_ITEMS } from '../constants/menuItems';

export const useMypageMenu = () => {
  //   const navigation = useNavigation<RootStackNavigationProp>();

  const handleNotice = useCallback(() => {
    console.log('공지사항');
    // navigation.navigate('Notice');
  }, []);

  const handleInquiry = useCallback(() => {
    console.log('문의사항');
    // navigation.navigate('Inquiry');
  }, []);

  const handleTeamIntro = useCallback(() => {
    console.log('픽셀 팀원 소개');
    // navigation.navigate('TeamIntro');
  }, []);

  const menuItems = MYPAGE_MENU_ITEMS.map(item => {
    switch (item.id) {
      case '1':
        return { ...item, onPress: handleNotice };
      case '2':
        return { ...item, onPress: handleInquiry };
      case '3':
        return { ...item, onPress: handleTeamIntro };
      default:
        return { ...item, onPress: () => {} };
    }
  });

  return { menuItems };
};
