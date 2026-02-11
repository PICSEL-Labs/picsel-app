import React from 'react';

import { useInquiryMenu } from '@/feature/mypage/inquiry/hooks/useInquiryMenu';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const InquiryScreen = () => {
  const { menuItems } = useInquiryMenu();

  return (
    <ScreenLayout>
      <MypageHeader title="문의사항" />

      <ListGroup items={menuItems} />
    </ScreenLayout>
  );
};

export default InquiryScreen;
