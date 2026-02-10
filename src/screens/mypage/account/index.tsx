import React from 'react';

import { View } from 'react-native';

import AppVersionSection from '@/feature/mypage/account/components/ui/molecules/AppVersionSection';
import LoginInfoSection from '@/feature/mypage/account/components/ui/molecules/LoginInfoSection';
import NicknameSection from '@/feature/mypage/account/components/ui/molecules/NicknameSection';
import { useAccountMenu } from '@/feature/mypage/account/hooks/useAccountMenu';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useUserStore } from '@/shared/store';
const APP_VER = '1.4.9';

const MypageAccountScreen = () => {
  const { userSocialType, userNickname, email } = useUserStore();
  const { accountMenuItems, handleEditNickname } = useAccountMenu();

  return (
    <ScreenLayout>
      <MypageHeader title="계정 관리" />

      <NicknameSection nickname={userNickname} onEdit={handleEditNickname} />
      <LoginInfoSection socialType={userSocialType} email={email} />
      <AppVersionSection version={APP_VER} isLatest />

      <View className="mb-3 mt-8 h-[6px] w-full bg-gray-50" />

      <ListGroup items={accountMenuItems} className="mt-8" />
    </ScreenLayout>
  );
};

export default MypageAccountScreen;
