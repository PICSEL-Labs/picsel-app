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

const MypageAccountScreen = () => {
  // const navigation = useNavigation<RootStackNavigationProp>();
  const { userSocialType } = useUserStore();
  const { accountMenuItems } = useAccountMenu();

  const handleEditNickname = () => {
    console.log('닉네임 수정');
    // navigation.navigate('EditNickname');
  };

  // TODO: 실제 사용자 데이터로 교체
  const userNickname = '닉네임123';
  const userEmail = 'picsel123@gmail.com';
  const appVersion = '1.4.9';

  return (
    <ScreenLayout>
      <MypageHeader title="계정 관리" />

      <NicknameSection nickname={userNickname} onEdit={handleEditNickname} />

      <LoginInfoSection socialType={userSocialType} email={userEmail} />

      <AppVersionSection version={appVersion} isLatest />

      <View className="mb-3 mt-8 h-[6px] w-full bg-gray-50" />

      <ListGroup items={accountMenuItems} className="mt-8" />
    </ScreenLayout>
  );
};

export default MypageAccountScreen;
