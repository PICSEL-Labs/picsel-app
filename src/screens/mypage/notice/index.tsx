import React from 'react';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const NoticeScreen = () => {
  return (
    <ScreenLayout>
      <MypageHeader title="공지사항" />
    </ScreenLayout>
  );
};

export default NoticeScreen;
