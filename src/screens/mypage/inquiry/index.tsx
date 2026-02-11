import React from 'react';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const InquiryScreen = () => {
  return (
    <ScreenLayout>
      <MypageHeader title="문의사항" />
    </ScreenLayout>
  );
};

export default InquiryScreen;
