import React from 'react';

import { View } from 'react-native';

import MypageTopBar from '@/feature/mypage/main/components/ui/atoms/MypageTopBar';
import NicknameSection from '@/feature/mypage/main/components/ui/atoms/NicknameSection';
import MypageMenuItem from '@/feature/mypage/main/components/ui/molecules/MypageMenuItem';
import { useMypageMenu } from '@/feature/mypage/main/hooks/useMypageMenu';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import StarIcons from '@/shared/icons/StarIcons';

const MypageScreen = () => {
  const { menuItems } = useMypageMenu();

  return (
    <ScreenLayout>
      <MypageTopBar
        onPressNotification={() => console.log('알림 페이지로')}
        onPressSetting={() => console.log('설정 페이지로')}
      />

      <NicknameSection
        // 유저 닉네임 정보 필요 -> 서버측 문의 완료
        nickname="닉네임 들어갑니다"
        onPressEdit={() => console.log('닉네임 변경')}
      />

      <View className="mb-4 mt-4 px-4" style={{ gap: 12 }}>
        <MypageMenuItem
          title="찜한 브랜드 설정"
          description="내가 찜한 브랜드를 한눈에 보고 관리해요"
          backgroundColor="bg-pink-100"
          icon={<StarIcons shape="empty" width={24} height={24} />}
          onPress={() => console.log('찜한 브랜드 설정')}
        />

        <MypageMenuItem
          title="앱 후기 남기기"
          description="솔직한 후기 한 줄이 저희에게 큰 힘이 돼요!"
          onPress={() => console.log('앱 후기 남기기')}
        />
      </View>

      <ListGroup items={menuItems} />
    </ScreenLayout>
  );
};

export default MypageScreen;
