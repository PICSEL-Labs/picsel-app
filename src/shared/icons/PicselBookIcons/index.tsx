import React from 'react';

import { View } from 'react-native';

import BookAdd from '@/assets/icons/picselBook/picselBook-add.svg';
import BookCoverSelected from '@/assets/icons/picselBook/picselBook-cover-selected.svg';
import BookDefault from '@/assets/icons/picselBook/picselBook-default.svg';
import Spring from '@/assets/icons/picselBook/spring.svg';
import CachedImage from '@/shared/components/CachedImage';

interface Props {
  shape: 'default' | 'add' | 'cover-selected';
  width: number;
  height: number;
  imageUri?: string;
  opacity?: number;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

const PicselBookIcons = ({
  shape,
  width,
  height,
  imageUri,
  opacity,
  onImageLoad,
  onImageError,
}: Props) => {
  const renderIcon = () => {
    switch (shape) {
      case 'default':
        return <BookDefault width={width} height={height} />;
      case 'add':
        return <BookAdd width={width} height={height} />;
      case 'cover-selected':
        return <BookCoverSelected width={width} height={height} />;
      default:
        return <BookDefault width={width} height={height} />;
    }
  };

  if (imageUri) {
    return (
      <View style={{ width, height, position: 'relative' }}>
        {renderIcon()}
        <Spring className="absolute z-50" />
        <CachedImage
          uri={imageUri}
          style={{
            position: 'absolute',
            left: '7%',
            width: '88%',
            height: '97%',
            borderRadius: 5,
          }}
          resizeMode="cover"
          onLoad={onImageLoad}
          onError={onImageError}
        />
        {opacity < 1 && (
          <View
            style={{
              position: 'absolute',
              left: '7%',
              width: '88%',
              height: '97%',
              borderRadius: 5,
              backgroundColor: '#0000004D',
            }}
          />
        )}
      </View>
    );
  }

  return renderIcon();
};

export default PicselBookIcons;
