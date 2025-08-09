import React from 'react';

import { Image } from 'react-native';
import Config from 'react-native-config';

interface Props {
  brandIconImageUrl: string;
}

const DefaultMarker = ({ brandIconImageUrl }: Props) => {
  return (
    <Image
      source={{ uri: Config.IMAGE_URL + brandIconImageUrl }}
      width={28}
      height={28}
      className="rounded-full border-2 border-white"
      style={{ boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)' }}
    />
  );
};

export default DefaultMarker;
