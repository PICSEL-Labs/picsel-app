export const DROPDOWN_ITEMS = {
  SET_REPRESENTATIVE: '대표사진으로 변경',
  CHANGE_PHOTO: '다른 사진으로 변경',
  SAVE_PHOTO: '사진 저장',
  DELETE: '삭제',
} as const;

export const DELETE_ALERT = {
  TITLE: '해당 픽셀을 삭제할까요?',
  DESCRIPTION: '삭제 시 복구가 불가능해요',
  CANCEL: '취소',
  CONFIRM: '삭제',
} as const;

export const SET_REPRESENTATIVE_ALERT = {
  TITLE: '해당 사진을\n대표사진으로 변경할까요?',
  DESCRIPTION: '기존 대표사진은 추가사진으로 변경돼요',
  CANCEL: '취소',
  CONFIRM: '변경',
} as const;

export const SAVE_PERMISSION_MODAL = {
  TITLE: '설정에서 픽셀의\n사진 접근을 허용해야 해요',
  DESCRIPTION: '설정 > 픽셀 > 사진에서\n사진 접근 허용으로 변경해 주세요',
  CANCEL: '취소',
  CONFIRM: '설정으로 이동',
} as const;

export const TOAST_MESSAGES = {
  REPRESENTATIVE_SUCCESS: '대표사진이 변경됐어요',
  SAVE_SUCCESS: '사진을 앨범에 저장했어요',
  SAVE_FAILURE: '사진 저장에 실패했어요',
  DELETE_SUCCESS: '사진을 삭제했어요',
} as const;
