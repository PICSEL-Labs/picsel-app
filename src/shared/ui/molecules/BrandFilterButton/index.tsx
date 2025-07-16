import React from 'react';

import { Pressable, Text } from 'react-native';

import FilterIcons from '@/shared/icons/FilterIcons';
import { filterButtonShadow } from '@/styles/filterButtonShadow';

interface Props {
  isActive: boolean;
  onPress: () => void;
}

const BrandFilterButton = ({ isActive, onPress }: Props) => {
  return (
    <Pressable
      className={`rounded-[27px] ${
        isActive ? 'bg-primary-pink' : 'bg-neutral-white'
      }`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 10,
        gap: 4,
        flexShrink: 0,
        alignSelf: 'flex-start',
        marginLeft: 16,
        ...(isActive ? filterButtonShadow.active : filterButtonShadow.inactive),
      }}
      onPress={onPress}>
      <FilterIcons shape={isActive ? 'white' : 'gray'} width={24} height={24} />
      <Text
        className={`body-rg-02 ${
          isActive ? 'text-neutral-white' : 'text-gray-900'
        }`}>
        브랜드 찾기
      </Text>
    </Pressable>
  );
};

export default BrandFilterButton;
