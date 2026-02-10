import React, { useEffect } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { View } from 'react-native';

import MypageTopBar from '@/feature/mypage/main/components/ui/atoms/MypageTopBar';
import NicknameSection from '@/feature/mypage/main/components/ui/atoms/NicknameSection';
import MypageMenuItem from '@/feature/mypage/main/components/ui/molecules/MypageMenuItem';
import { useMypageMenu } from '@/feature/mypage/main/hooks/useMypageMenu';
import { useGetUser } from '@/feature/mypage/main/queries/useGetUser';
import ListGroup from '@/feature/mypage/shared/components/ui/organisms/ListGroup';
import { MainNavigationProps } from '@/navigation';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import StarIcons from '@/shared/icons/StarIcons';
import { useToastStore } from '@/shared/store/ui/toast';

const MypageScreen = () => {
  const { data: user } = useGetUser();
  const { menuItems } = useMypageMenu();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RouteProp<MainNavigationProps, 'Mypage'>>();
  const { showToast } = useToastStore();

  useEffect(() => {
    if (route.params?.toastMessage) {
      showToast(route.params.toastMessage);
      navigation.setParams({ toastMessage: undefined });
    }
  }, [route.params?.toastMessage]);

  return (
    <ScreenLayout>
      <MypageTopBar
        onPressNotification={() => navigation.navigate('NotificationScreen')}
        onPressSetting={() => navigation.navigate('MypageSetting')}
      />

      <NicknameSection
        nickname={user?.userNickname ?? null}
        onPressEdit={() => navigation.navigate('EditNicknameScreen')}
      />

      <View className="mb-4 mt-4 px-4" style={{ gap: 12 }}>
        <MypageMenuItem
          title="찜한 브랜드 설정"
          description="내가 찜한 브랜드를 한눈에 보고 관리해요"
          backgroundColor="bg-pink-100"
          icon={<StarIcons shape="empty" width={24} height={24} />}
          onPress={() => navigation.navigate('BrandSettingScreen')}
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
