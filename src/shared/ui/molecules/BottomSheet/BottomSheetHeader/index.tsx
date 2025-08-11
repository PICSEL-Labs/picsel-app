import React, { ReactNode } from 'react';

import { Text, View } from 'react-native';

interface Props {
  title: string;
  right?: ReactNode;
}

const BottomSheetHeader = ({ title, right }: Props) => {
  return (
    <>
      <View className="mb-4 h-[5px] w-[36px] self-center rounded-full bg-gray-300" />
      <View className="relative mb-[29px] items-center justify-center">
        <Text className="text-gray-900 title-01">{title}</Text>
        {right && <View className="absolute right-0 pr-[20px]">{right}</View>}
      </View>
    </>
  );
};

export default BottomSheetHeader;
