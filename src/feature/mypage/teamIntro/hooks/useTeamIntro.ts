import { useCallback } from 'react';

import { Linking } from 'react-native';

import { TEAM_LINKS } from '../constants/teamIntroTexts';

export const useTeamIntro = () => {
  const handleIntroduce = useCallback(() => {
    if (TEAM_LINKS.introduce) {
      Linking.openURL(TEAM_LINKS.introduce);
    }
  }, []);

  const handleInstagram = useCallback(() => {
    if (TEAM_LINKS.instagram) {
      Linking.openURL(TEAM_LINKS.instagram);
    }
  }, []);

  return { handleIntroduce, handleInstagram };
};
