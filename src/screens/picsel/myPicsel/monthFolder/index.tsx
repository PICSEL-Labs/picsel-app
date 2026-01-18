import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import MonthFolderTemplate from '@/feature/picsel/shared/components/ui/template/myPicsel/MonthFolderTemplate';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

type MonthFolderRouteProp = RouteProp<
  { MonthFolder: { year: string; month: string } },
  'MonthFolder'
>;

const MonthFolderScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<MonthFolderRouteProp>();
  const { year, month } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return <MonthFolderTemplate year={year} month={month} onBack={handleBack} />;
};

export default MonthFolderScreen;
