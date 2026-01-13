export const DELETE_ITEM_CONFIG = {
  photo: {
    unit: '장',
    itemName: '사진',
  },
  picselBook: {
    unit: '개',
    itemName: '픽셀북',
  },
} as const;

export type DeleteItemType = 'photo' | 'picselBook';
