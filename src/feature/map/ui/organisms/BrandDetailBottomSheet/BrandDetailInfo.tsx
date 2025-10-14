import React, { Dispatch, SetStateAction } from 'react';

import { View, Text, Pressable } from 'react-native';

import Dropdown from '@/assets/icons/dropdown/dropdown.svg';

interface Props {
  brandName: string;
  location: string;
  detailAddress: string;
  setOpenCopy: Dispatch<SetStateAction<boolean>>;
}

const BrandDetailInfo = ({
  brandName,
  detailAddress,
  location,
  setOpenCopy,
}: Props) => {
  return (
    <>
      <Text className="mt-2 text-gray-900 title-01">{brandName}</Text>

      <View className="flex-row items-end space-x-1">
        <Text className="mt-2 text-gray-900 headline-01">{location}</Text>
        <Text className="mt-2 text-gray-900 body-rg-02">·</Text>
        <Text className="mt-2 text-gray-900 body-rg-02">{detailAddress}</Text>

        <Pressable onPress={() => setOpenCopy(prev => !prev)}>
          <Dropdown />
        </Pressable>
      </View>
    </>
  );
};

export default BrandDetailInfo;
