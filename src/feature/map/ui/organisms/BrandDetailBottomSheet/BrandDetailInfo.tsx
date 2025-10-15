import React, { Dispatch, SetStateAction } from 'react';

import { View, Text, Pressable } from 'react-native';

import DropIcons from '@/shared/icons/DropIcons';

interface Props {
  brandName: string;
  location: string;
  detailAddress: string;
  setOpenCopy: Dispatch<SetStateAction<boolean>>;
  openCopy: boolean;
}

const BrandDetailInfo = ({
  brandName,
  detailAddress,
  location,
  setOpenCopy,
  openCopy,
}: Props) => {
  return (
    <>
      <Text className="mt-2 text-gray-900 title-01">{brandName}</Text>

      <View className="flex-row items-end space-x-1">
        <Text className="mt-2 text-gray-900 headline-01">{location}</Text>
        <Text className="mt-2 text-gray-900 body-rg-02">·</Text>
        <Text className="mt-2 text-gray-900 body-rg-02">{detailAddress}</Text>

        <Pressable onPress={() => setOpenCopy(prev => !prev)}>
          <DropIcons height={24} width={24} shape={openCopy ? 'up' : 'down'} />
        </Pressable>
      </View>
    </>
  );
};

export default BrandDetailInfo;
