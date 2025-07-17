import React, { useState } from 'react';

import Input from '../../atoms/Input';

import BrandFilterButton from '@/feature/brand/ui/organisms/BrandFilterButton';

const MapSearchControls = () => {
  const [brandName, setBrandName] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  return (
    <>
      <Input
        value={brandName}
        onChangeText={brand => setBrandName(brand)}
        handleClear={() => setBrandName('')}
        placeholder="브랜드명, 매장명, 위치 검색"
        search
        close
        className="pb-[8px]"
      />
      <BrandFilterButton
        variant={isFilterActive ? 'active' : 'inactive'}
        onPress={() => setIsFilterActive(prev => !prev)}
      />
    </>
  );
};

export default MapSearchControls;
