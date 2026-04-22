import { Dimensions } from 'react-native';

export const ALBUM_PANEL = {
  SLIDE_DURATION: 400,
  SCREEN_HEIGHT: Dimensions.get('window').height,
};

export const ITEM_HEIGHT = 80;

export const PHOTO_PERMISSION_ALERT = {
  TITLE: '사진 접근 권한 필요',
  MESSAGE:
    '앨범에서 사진을 선택하려면 사진 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
  CANCEL_TEXT: '취소',
  CONFIRM_TEXT: '설정으로 이동',
};
