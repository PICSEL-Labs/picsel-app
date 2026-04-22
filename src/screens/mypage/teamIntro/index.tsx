import React from 'react';

import { Image, Text, View } from 'react-native';

import Logo from '@/assets/images/logo/teamLogo.png';
import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import TeamFooter from '@/feature/mypage/teamIntro/components/ui/atoms/TeamFooter';
import TeamActionCards from '@/feature/mypage/teamIntro/components/ui/molecules/TeamActionCards';
import TeamMemberGrid from '@/feature/mypage/teamIntro/components/ui/molecules/TeamMemberGrid';
import { TEAM_INTRO_DESCRIPTION } from '@/feature/mypage/teamIntro/constants/teamIntroTexts';
import { useTeamIntro } from '@/feature/mypage/teamIntro/hooks/useTeamIntro';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const TeamIntroScreen = () => {
  const { handleIntroduce, handleInstagram } = useTeamIntro();

  return (
    <ScreenLayout className="bg-primary-black">
      <MypageHeader title="팀원 소개" white />

      <View className="flex items-center">
        <Image source={Logo} style={{ width: 375, height: 66 }} />
      </View>

      <View className="flex items-center justify-center px-4 pb-10 pt-8">
        <Text className="text-center text-white body-rg-02">
          {TEAM_INTRO_DESCRIPTION}
        </Text>
      </View>

      <View
        className="flex flex-col items-center self-stretch px-9"
        style={{ gap: 8 }}>
        <TeamMemberGrid />
        <TeamActionCards onIntroduce={handleIntroduce} />
      </View>

      <TeamFooter onPress={handleInstagram} />
    </ScreenLayout>
  );
};

export default TeamIntroScreen;
