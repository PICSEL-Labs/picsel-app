export const TOOLTIP_CONFIG = {
  KAKAO: {
    shape: 'left' as const,
    offset: { left: 10 },
    tooltipDir: { left: 15 },
  },
  APPLE: {
    shape: 'right' as const,
    offset: { right: 10 },
    tooltipDir: { right: 15 },
  },
  GOOGLE: { shape: 'mid' as const, offset: {}, tooltipDir: {} },
  NAVER: { shape: 'mid' as const, offset: {}, tooltipDir: {} },
};
