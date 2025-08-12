import React from 'react';

import { Image } from 'react-native';
import Config from 'react-native-config';

import SelectedStoreMarker from '../../components/SelectedStoreMarker';

interface Props {
  brandIconImageUrl: string;
  selected: boolean;
}

const DefaultMarker = ({ brandIconImageUrl, selected }: Props) => {
  const imageSource = { uri: Config.IMAGE_URL + brandIconImageUrl };

  return selected ? (
    <SelectedStoreMarker imageSource={imageSource} />
  ) : (
    <Image
      width={28}
      height={28}
      source={imageSource}
      resizeMode="cover"
      className="rounded-full border-2 border-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    />
  );
};

export default DefaultMarker;
