export const tabAnimationService = {
  calculateIndicatorPosition: (
    tab: 'my' | 'book',
    tabWidth: number,
    indicatorWidth: number,
  ) => {
    const centerOffset = (tabWidth - indicatorWidth) / 2;
    return tab === 'my' ? centerOffset : tabWidth + centerOffset;
  },

  getAnimationConfig: () => ({
    duration: 250,
  }),
};
