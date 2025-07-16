import React, { useState } from 'react';

import Input from '../../atoms/Input';
import BrandFilterButton from '../../molecules/BrandFilterButton';

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
        paddingBottom={8}
      />
      <BrandFilterButton
        isActive={isFilterActive}
        onPress={() => setIsFilterActive(prev => !prev)}
      />
    </>
  );
};

export default MapSearchControls;
