import { favoriteBrandApi } from '../../api/favoriteBrandApi';

import { SignupNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { useSelectedBrandsStore } from '@/shared/store';

export const useSelectedBrands = (
  navigation: SignupNavigationProp,
  refreshToken?: string,
) => {
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

    navigation.navigate('SignupSuccess', { refreshToken });
  };

  return {
    handleSelectedCompleted,
    actualCount,
    isDisabled,
  };
};
