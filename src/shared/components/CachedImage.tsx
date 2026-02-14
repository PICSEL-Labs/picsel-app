import React from 'react';

import { Image, ImageStyle, StyleProp } from 'react-native';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

const CachedImage = ({
  uri,
  style,
  resizeMode = 'cover',
  onLoad,
  onError,
  className,
}: Props) => {
  if (!uri) {
    return null;
  }

  return (
    <Image
      className={className}
      style={style}
      source={{ uri, cache: 'default' }}
      resizeMode={resizeMode}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default CachedImage;
