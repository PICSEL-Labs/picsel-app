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
  elevation: 4,
};

export const defaultButtonShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
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
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 6,
};
