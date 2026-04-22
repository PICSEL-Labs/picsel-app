export const DELETE_ITEM_CONFIG = {
  photo: {
    unit: '장',
    itemName: '픽셀',
  },
  picselBook: {
    unit: '개',
    itemName: '픽셀북',
  },
} as const;

export type DeleteItemType = 'photo' | 'picselBook';
