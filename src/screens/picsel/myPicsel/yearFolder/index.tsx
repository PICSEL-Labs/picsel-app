import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import YearFolderTemplate from '@/feature/picsel/shared/components/ui/template/myPicsel/YearFolderTemplate';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

type YearFolderRouteProp = RouteProp<
  { YearFolder: { year: string } },
  'YearFolder'
>;

const YearFolderScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<YearFolderRouteProp>();
  const { year } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return <YearFolderTemplate year={year} onBack={handleBack} />;
};

export default YearFolderScreen;
