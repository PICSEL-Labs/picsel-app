import React, { useEffect, useMemo, useRef } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, Text, View } from 'react-native';

import BottomSheetBrandImage from '../atoms/BottomSheetBrandImage';

import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/styles/shadows';

interface Brand {
  brandName: string;
  brandIconImageUrl: string;
}

interface Props {
  visible: boolean;
  brands?: Brand[];
  showSheet: () => void;
  hideSheet: () => void;
}

const NearbyBrandBottomSheet = ({
  showSheet,
  hideSheet,
  visible,
  brands = [],
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['5%', '25%'], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [visible]);

  const handleSheetChange = (index: number) => {
    if (index === 0) {
      hideSheet();
    } else {
      showSheet();
    }
  };

  return (
    <BottomSheet
      style={bottomSheetShadow}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      index={0}
      onChange={handleSheetChange}
      animateOnMount={false}
      enablePanDownToClose={false}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <Text className="mb-2 text-center text-gray-900 title-01">
          이 근처 브랜드
        </Text>

        <FlatList
          className="px-6"
          horizontal
          data={brands}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="mr-3 mt-3 w-[90px] items-center">
              <BottomSheetBrandImage imageUrl={item.brandIconImageUrl} nearBy />

              <Text className="mt-2 text-center text-gray-900 body-rg-02">
                {item.brandName}
              </Text>
            </View>
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default NearbyBrandBottomSheet;
