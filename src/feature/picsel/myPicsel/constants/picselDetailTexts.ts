export const DROPDOWN_ITEMS = {
  EDIT: '전체 편집',
  MOVE: '다른 픽셀북으로 이동',
  SHARE: '공유',
  DELETE: '삭제',
} as const;

export const DELETE_ALERT = {
  TITLE: '해당 픽셀을 삭제할까요?',
  DESCRIPTION: '삭제 시 복구가 불가능해요',
  CANCEL: '취소',
  CONFIRM: '삭제',
} as const;

export const EDIT_ALERT = {
  TITLE: '전체 편집을 종료할까요?',
  DESCRIPTION: '지금까지 편집한 정보는\n적용되지 않아요',
  CANCEL: '계속하기',
  CONFIRM: '종료',
} as const;

export const TOAST_MESSAGES = {
  DELETE_SUCCESS: '픽셀을 삭제했어요',
  EDIT_SUCCESS: '픽셀 편집이 완료됐어요',
} as const;
