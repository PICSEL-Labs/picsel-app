import React, { useEffect, useState } from 'react';

import { Image, ImageProps } from 'react-native';

interface Props extends ImageProps {
  uri: string;
}

const AspectRatioImage = ({ uri, style, ...rest }: Props) => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (!uri) {
      return;
    }

    Image.getSize(uri, (width, height) => {
      setRatio(width / height);
    });
  }, [uri]);

  return (
    <Image
      {...rest}
      source={{ uri }}
      style={[{ width: '100%', aspectRatio: ratio }, style]}
      resizeMode="cover"
    />
  );
};

export default AspectRatioImage;
