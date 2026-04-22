import React from 'react';

import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import AppVersionSection from '@/feature/mypage/account/components/ui/molecules/AppVersionSection';
import LoginInfoSection from '@/feature/mypage/account/components/ui/molecules/LoginInfoSection';
import NicknameSection from '@/feature/mypage/account/components/ui/molecules/NicknameSection';
import { useAccountMenu } from '@/feature/mypage/account/hooks/useAccountMenu';
import { useGetUser } from '@/feature/mypage/main/queries/useGetUser';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useAppConfigStore } from '@/shared/store';

const MypageAccountScreen = () => {
  const { data: user } = useGetUser();
  const { accountMenuItems, handleEditNickname } = useAccountMenu();
  const isLatest = useAppConfigStore(state => state.isLatest);

  return (
    <ScreenLayout>
      <MypageHeader title="계정 관리" />

      <NicknameSection
        nickname={user?.userNickname ?? null}
        onEdit={handleEditNickname}
      />
      <LoginInfoSection
        socialType={user?.socialType ?? null}
        email={user?.email ?? null}
      />
      <AppVersionSection
        version={DeviceInfo.getVersion()}
        isLatest={isLatest}
      />

      <View className="mb-3 mt-8 h-[6px] w-full bg-gray-50" />

      <ListGroup items={accountMenuItems} className="mt-8" />
    </ScreenLayout>
  );
};

export default MypageAccountScreen;
