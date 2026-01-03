import { NavigationProp } from '@react-navigation/native';

export const picselBookNavigationService = {
  navigateToPhotoUpload: (navigation: NavigationProp<any>) => {
    navigation.navigate('PhotoUpload');
  },

  navigateToAddBook: (_navigation: NavigationProp<any>) => {
    // TODO: 북 추가 화면으로 이동 (현재는 로그만)
    console.log('북 추가 화면으로 이동');
    // 실제 구현 시: _navigation.navigate('AddBook');
  },
};
