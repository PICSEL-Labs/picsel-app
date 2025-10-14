import React, { useEffect, useRef } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image, Text, View } from 'react-native';
import Config from 'react-native-config';

import Dropdown from '@/assets/icons/dropdown/dropdown.svg';
import BrandFavIcons from '@/shared/icons/BrandFav';
import Button from '@/shared/ui/atoms/Button';
import { bottomSheetIndicator } from '@/styles/bottomSheetIndicator';
import { bottomSheetShadow, defaultShadow } from '@/styles/shadows';

interface NearbyBrandBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const BrandDetailBottomSheet = ({
  visible,
  onClose,
}: NearbyBrandBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      style={bottomSheetShadow}
      ref={bottomSheetModalRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={bottomSheetIndicator}
      onDismiss={onClose}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView>
        <View className="mt-1 h-[270px] flex-1 items-center justify-center">
          <View style={defaultShadow}>
            <Image
              className="h-[60px] w-[60px] rounded-full"
              source={{
                uri: Config.IMAGE_URL + '/img/brand/logo/default.jpg',
              }}
              resizeMode="cover"
            />
            <View className="absolute bottom-0 right-0">
              <BrandFavIcons width={23} height={23} shape="gray" />
            </View>
          </View>
          <Text className="mt-2 text-gray-900 title-01">
            하루필름 부산서면점
          </Text>

          <View className="flex-row items-end space-x-1">
            <Text className="mt-2 text-gray-900 headline-01">349m</Text>
            <Text className="mt-2 text-gray-900 body-rg-02">·</Text>
            <Text className="mt-2 text-gray-900 body-rg-02">
              부산 부산진구 중앙대로
            </Text>
            <Dropdown />
          </View>

          <View className="mb-2 py-4">
            <Button
              qr
              text="QR 사진 저장"
              textColor="pink"
              color="white"
              shadow
              onPress={() => console.log('큐알 저장')}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BrandDetailBottomSheet;
