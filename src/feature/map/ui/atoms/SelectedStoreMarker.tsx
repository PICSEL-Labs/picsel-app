import React from 'react';

import { Image } from 'react-native';
import Svg, { Defs, ClipPath, Path, ForeignObject } from 'react-native-svg';

interface Props {
  imageSource: {
    uri: string;
  };
}

// 임시 코드 -> 다은님께 해당 디자인 이슈 공유드려놓은 상황
const SelectedStoreMarker = ({ imageSource }: Props) => {
  return (
    <Svg width={46} height={54} viewBox="0 0 46 54" fill="none">
      <Defs>
        <ClipPath id="teardrop-clip">
          <Path d="M23 1C17.1673 1.00614 11.5753 3.16043 7.45096 6.99024C3.32659 10.82 1.00662 16.0126 1 21.4288C1 38.9093 21 52.1114 21.8525 52.6639C22.1888 52.8827 22.5894 53 23 53C23.4106 53 23.8112 52.8827 24.1475 52.6639C25 52.1114 45 38.9093 45 21.4288C44.9934 16.0126 42.6734 10.82 38.549 6.99024C34.4247 3.16043 28.8327 1.00614 23 1Z" />
        </ClipPath>
      </Defs>

      <ForeignObject
        x="0"
        y="0"
        width="46"
        height="54"
        clipPath="url(#teardrop-clip)">
        <Image
          source={imageSource}
          style={{ width: 46, height: 54 }}
          resizeMode="cover"
        />
      </ForeignObject>

      <Path
        d="M23 1C17.1673 1.00614 11.5753 3.16043 7.45096 6.99024C3.32659 10.82 1.00662 16.0126 1 21.4288C1 38.9093 21 52.1114 21.8525 52.6639C22.1888 52.8827 22.5894 53 23 53C23.4106 53 23.8112 52.8827 24.1475 52.6639C25 52.1114 45 38.9093 45 21.4288C44.9934 16.0126 42.6734 10.82 38.549 6.99024C34.4247 3.16043 28.8327 1.00614 23 1Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default SelectedStoreMarker;
