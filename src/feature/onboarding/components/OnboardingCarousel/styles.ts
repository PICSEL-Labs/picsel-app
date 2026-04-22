import { StyleProp, ViewStyle } from 'react-native';

export const paginationStyles = {
  activeDotStyle: {
    backgroundColor: '#E5E6E9',
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  dotStyle: {
    backgroundColor: '#26272C',
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  } as StyleProp<ViewStyle>,
};
