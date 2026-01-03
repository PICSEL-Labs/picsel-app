import { useNavigation } from '@react-navigation/native';

import { picselBookNavigationService } from './picselBookNavigationService';

import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

export const usePicselBookActions = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return {
    handleAddPicsel: () => {
      picselBookNavigationService.navigateToPhotoUpload(navigation);
    },
    handleAddBook: () => {
      picselBookNavigationService.navigateToAddBook(undefined); // navigation 파라미터 제거
    },
  };
};
