import React from 'react';

import { View, Image, Pressable } from 'react-native';
import Config from 'react-native-config';

import BrandFavIcons from '@/shared/icons/BrandFav';
import { defaultShadow } from '@/styles/shadows';

interface Props {
  imageUrl: string;
  nearBy?: boolean;
}

const BottomSheetBrandImage = ({ imageUrl, nearBy = false }: Props) => {
  return (
    <View style={defaultShadow} className={nearBy && 'items-center'}>
      <Image
        className="h-[60px] w-[60px] rounded-full"
        source={{ uri: Config.IMAGE_URL + imageUrl }}
        resizeMode="cover"
      />

      <Pressable
        className="absolute bottom-0 right-0"
        onPress={() => console.log('fav pressed')}>
        <BrandFavIcons width={23} height={23} shape="gray" />
      </Pressable>
    </View>
  );
};

export default BottomSheetBrandImage;
