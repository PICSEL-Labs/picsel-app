import React from 'react';

import { useSettingMenu } from '@/feature/mypage/setting/hooks/useSettingMenu';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const MypageSettingScreen = () => {
  const { menuItems } = useSettingMenu();

  return (
    <ScreenLayout>
      <MypageHeader title="설정" />

      <ListGroup items={menuItems} className="mt-4" />
    </ScreenLayout>
  );
};

export default MypageSettingScreen;
