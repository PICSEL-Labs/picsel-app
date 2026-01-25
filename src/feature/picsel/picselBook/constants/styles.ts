// Shadow styles
export const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 2, height: -2 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 4,
} as const;

export const INSET_SHADOW =
  '0 -2px 8px 2px rgba(0, 0, 0, 0.10), 2px 4px 8px 0 rgba(255, 255, 255, 0.25) inset';

// Card dimensions
export const TEXT_LIST_CARD = {
  WIDTH: 360,
  PADDING: 12,
  IMAGE_WIDTH: 100,
  IMAGE_HEIGHT: 150,
} as const;
