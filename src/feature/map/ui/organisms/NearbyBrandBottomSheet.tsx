import React, { useEffect, useMemo, useRef } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, Image, Text, View } from 'react-native';
import Config from 'react-native-config';

import BrandFavIcons from '@/shared/icons/BrandFav';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow, defaultShadow } from '@/styles/shadows';

interface Brand {
  brandName: string;
  brandIconImageUrl: string;
}

interface NearbyBrandBottomSheetProps {
  visible: boolean;
  brands?: Brand[];
}

const NearbyBrandBottomSheet = ({
  visible,
  brands = [],
}: NearbyBrandBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['5%', '25%'], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [visible]);

  return (
    <BottomSheet
      style={bottomSheetShadow}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={bottomSheetIndicator}
      index={1}
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
              <View style={defaultShadow} className="items-center">
                <Image
                  className="h-[60px] w-[60px] rounded-full"
                  source={{ uri: Config.IMAGE_URL + item.brandIconImageUrl }}
                  resizeMode="cover"
                />
                <View className="absolute bottom-0 right-0">
                  <BrandFavIcons width={23} height={23} shape="gray" />
                </View>
              </View>

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
