export type BrandSettingMode = 'default' | 'remove' | 'add';

export const HEADER_TITLES: Record<BrandSettingMode, string> = {
  default: '찜한 브랜드',
  remove: '찜한 브랜드 삭제',
  add: '찜 브랜드 추가',
} as const;

export const GUIDE_TEXTS: Record<
  'remove' | 'add',
  { highlight: string; rest: string }
> = {
  remove: { highlight: '찜 해제', rest: '할 브랜드를 골라주세요.' },
  add: { highlight: '추가로 찜할', rest: ' 브랜드를 골라주세요.' },
} as const;

export const TOAST_MESSAGES = {
  REMOVE_EMPTY: '찜 해제할 브랜드를 골라주세요',
  REMOVE_ERROR: '찜 해제 중 오류가 발생했어요',
  REMOVE_SUCCESS: (count: number) => `${count}개의 브랜드를 찜 해제 했어요`,
  ADD_EMPTY: '찜 추가할 브랜드를 골라주세요',
  ADD_ERROR: '브랜드 추가 중 오류가 발생했어요',
  ADD_SUCCESS: (count: number) => `${count}개의 브랜드를 찜 추가했어요`,
} as const;

export const ACTION_TEXTS = {
  REMOVE: (count: number) =>
    count > 0 ? `${count}개의 브랜드 찜 해제하기` : '찜 해제하기',
  ADD: (count: number) =>
    count > 0 ? `${count}개의 브랜드 찜 추가하기` : '추가하기',
} as const;

export const DROPDOWN_ITEMS = {
  ADD: '찜 브랜드 추가',
  REMOVE: '찜 해제',
} as const;

export const EMPTY_TEXT = '찜한 브랜드가 없어요';
