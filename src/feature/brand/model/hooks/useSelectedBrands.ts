import { NavigationProp } from '@react-navigation/native';

import { favoriteBrandApi } from '../../api/favoriteBrandApi';

import { useSelectedBrandsStore } from '@/shared/store';

export const useSelectedBrands = (navigation: NavigationProp<any>) => {
  const { selectedList } = useSelectedBrandsStore();

  const actualCount = selectedList.some(b => b.brandId === 'NONE')
    ? 0
    : selectedList.length;
  const isDisabled = selectedList.length < 1;

  const handleSelectedCompleted = async () => {
    const brandIds = selectedList.map(value => value.brandId);

    try {
      const res = await favoriteBrandApi({ brandIds });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    navigation.navigate('SignupSuccess');
  };

  return {
    handleSelectedCompleted,
    actualCount,
    isDisabled,
  };
};
