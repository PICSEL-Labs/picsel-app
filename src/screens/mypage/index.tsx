import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import MypageTopBar from '@/feature/mypage/main/components/ui/atoms/MypageTopBar';
import NicknameSection from '@/feature/mypage/main/components/ui/atoms/NicknameSection';
import NicknameSectionSkeleton from '@/feature/mypage/main/components/ui/atoms/NicknameSectionSkeleton';
import MypageMenuItem from '@/feature/mypage/main/components/ui/molecules/MypageMenuItem';
import { useMypageMenu } from '@/feature/mypage/main/hooks/useMypageMenu';
import { useGetUser } from '@/feature/mypage/main/queries/useGetUser';
import { useGetNotifications } from '@/feature/mypage/notification/queries/useGetNotifications';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import StarIcons from '@/shared/icons/StarIcons';

const MypageScreen = () => {
  const { data: user, isLoading } = useGetUser();
  const { data: notifications } = useGetNotifications();
  const { menuItems } = useMypageMenu();
  const navigation = useNavigation<RootStackNavigationProp>();

  const hasUnread = notifications?.some(n => !n.isRead) ?? false;

  return (
    <ScreenLayout>
      <MypageTopBar
        hasUnread={hasUnread}
        onPressNotification={() =>
          navigation.navigate('MypageRoute', {
            screen: 'NotificationScreen',
          })
        }
        onPressSetting={() =>
          navigation.navigate('MypageRoute', { screen: 'MypageSetting' })
        }
      />

      {isLoading ? (
        <NicknameSectionSkeleton />
      ) : (
        <NicknameSection
          nickname={user?.userNickname ?? ''}
          onPressEdit={() =>
            navigation.navigate('MypageRoute', {
              screen: 'EditNicknameScreen',
            })
          }
        />
      )}

      <View className="mb-4 mt-4 px-4" style={{ gap: 12 }}>
        <MypageMenuItem
          title="찜한 브랜드 설정"
          description="내가 찜한 브랜드를 한눈에 보고 관리해요"
          backgroundColor="bg-pink-100"
          icon={<StarIcons shape="empty" width={24} height={24} />}
          onPress={() =>
            navigation.navigate('MypageRoute', {
              screen: 'BrandSettingScreen',
            })
          }
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
