import React, { useEffect, useRef } from 'react';

import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CloseIcons from '@/shared/icons/CloseIcons';
import { insetShadow } from '@/styles/shadows';

interface Props {
  selectedList: {
    brandId: string;
    name: string;
  }[];
  onPressIn: (brandId: string) => void;
}

const SelectedBrand = ({ selectedList, onPressIn }: Props) => {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [selectedList]);

  return (
    <View>
      {selectedList.length > 0 && selectedList[0].brandId !== 'NONE' && (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator
          indicatorStyle="black"
          className="flex-row space-x-2 pb-[20px]">
          {selectedList.map(item => (
            <View
              key={item.brandId}
              className="ml-5 flex-row items-center justify-center rounded-[27px] bg-pink-500 pb-2 pl-3 pr-2 pt-2"
              style={{ boxShadow: insetShadow.default }}>
              <Text className="mr-1 text-white headline-01">{item.name}</Text>

              <Pressable onPressIn={() => onPressIn(item.brandId)}>
                <CloseIcons shape="white" width={24} height={24} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SelectedBrand;
