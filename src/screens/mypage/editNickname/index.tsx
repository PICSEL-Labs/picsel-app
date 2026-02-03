import React from 'react';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const EditNicknameScreen = () => {
  return (
    <ScreenLayout>
      <MypageHeader title="닉네임 수정" />
    </ScreenLayout>
  );
};

export default EditNicknameScreen;
