import React from 'react';

import { Image } from 'react-native';
import Config from 'react-native-config';

import SelectedStoreMarker from '../../components/SelectedStoreMarker';

interface Props {
  brandIconImageUrl: string;
  selected: boolean;
}

const DefaultMarker = ({ brandIconImageUrl, selected }: Props) => {
  return selected ? (
    <SelectedStoreMarker brandIconImageUrl={brandIconImageUrl} />
  ) : (
    <Image
      source={{ uri: Config.IMAGE_URL + brandIconImageUrl }}
      width={28}
      height={28}
      className="rounded-full border-2 border-white"
      // 임시 shadow value 추후 쉐도우 스타일 코드 구현 후 수정
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
