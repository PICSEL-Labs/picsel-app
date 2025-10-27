export const defaultShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 6,
};

export const inputShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
};

export const defaultButtonShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
};

export const insetShadow = {
  default:
    '-2px -4px 12px 0px rgba(255, 255, 255, 0.10) inset, -2px -2px 8px 0px rgba(0, 0, 0, 0.20) inset, 2px 4px 8px 0px rgba(255, 255, 255, 0.25) inset',
};

export const filterButtonShadow = {
  inactive: {
    ...defaultShadow,
  },
  active: {
    boxShadow: insetShadow.default,
  },
};

export const bottomSheetShadow = {
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  backgroundColor: '#FFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
};

export const mapIconShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0.1 },
  shadowOpacity: 0.3,
  shadowRadius: 0.5,
};

// 디자인 파트 수정 요청시
// 바로 수정 반영할게요.
export const favoriteShadow = {
  shadowColor: '#FF6C9A',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  shadowRadius: 7,
};
