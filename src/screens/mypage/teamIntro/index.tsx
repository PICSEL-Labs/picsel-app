import React from 'react';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const TeamIntroScreen = () => {
  return (
    <ScreenLayout>
      <MypageHeader title="팀원 소개" />
    </ScreenLayout>
  );
};

export default TeamIntroScreen;
