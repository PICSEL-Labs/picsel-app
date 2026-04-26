import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import MenuCardIcon from '@/feature/mypage/main/components/ui/atoms/MenuCardIcon';
import MypageTopBar from '@/feature/mypage/main/components/ui/atoms/MypageTopBar';
import NicknameSection from '@/feature/mypage/main/components/ui/atoms/NicknameSection';
import NicknameSectionSkeleton from '@/feature/mypage/main/components/ui/atoms/NicknameSectionSkeleton';
import MypageMenuItem from '@/feature/mypage/main/components/ui/molecules/MypageMenuItem';
import { MYPAGE_CARD_ITEMS } from '@/feature/mypage/main/constants/menuItems';
import { useMypageMenu } from '@/feature/mypage/main/hooks/useMypageMenu';
import { useGetUser } from '@/feature/mypage/main/queries/useGetUser';
import { useGetNotifications } from '@/feature/mypage/notification/queries/useGetNotifications';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const MypageScreen = () => {
  const { data: user, isLoading } = useGetUser();
  const { data: notifications } = useGetNotifications();
  const { menuItems, handleCardPress } = useMypageMenu();
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
        {MYPAGE_CARD_ITEMS.map(card => (
          <MypageMenuItem
            key={card.title}
            title={card.title}
            description={card.description}
            backgroundColor={card.backgroundColor}
            icon={
              card.iconType ? (
                <MenuCardIcon iconType={card.iconType} />
              ) : undefined
            }
            onPress={() => handleCardPress(card)}
          />
        ))}
      </View>

      <ListGroup items={menuItems} />
    </ScreenLayout>
  );
};

export default MypageScreen;
