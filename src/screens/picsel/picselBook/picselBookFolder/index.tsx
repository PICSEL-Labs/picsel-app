import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import PicselBookFolderTemplate from '@/feature/picsel/picselBook/components/ui/template/PicselBookFolderTemplate';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

type PicselBookFolderRouteProp = RouteProp<
  { PicselBookFolder: { bookId: string; bookName: string } },
  'PicselBookFolder'
>;

const PicselBookFolderScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<PicselBookFolderRouteProp>();
  const { bookId, bookName } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePhotoPress = (picselId: string) => {
    navigation.navigate('PicselDetail', { picselId });
  };

  return (
    <PicselBookFolderTemplate
      bookId={bookId}
      bookName={bookName}
      onBack={handleBack}
      onPhotoPress={handlePhotoPress}
    />
  );
};

export default PicselBookFolderScreen;
