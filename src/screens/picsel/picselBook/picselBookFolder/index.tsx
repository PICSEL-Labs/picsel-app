import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import PicselBookFolderTemplate from '@/feature/picsel/picselBook/components/ui/template/PicselBookFolderTemplate';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

type PicselBookFolderRouteProp = RouteProp<
  { PicselBookFolder: { bookId: string } },
  'PicselBookFolder'
>;

const PicselBookFolderScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<PicselBookFolderRouteProp>();
  const { bookId } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return <PicselBookFolderTemplate bookId={bookId} onBack={handleBack} />;
};

export default PicselBookFolderScreen;
