import React, { useState, useEffect } from 'react';

import { Image } from 'react-native';

interface Props {
  imageSource: {
    uri: string;
  };
}

const DefaultMarker = ({ imageSource }: Props) => {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderKey(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // shadow 작업 이후 적용 필요
    <Image
      key={renderKey}
      width={28}
      height={28}
      source={{
        ...imageSource,
        cache: 'force-cache',
      }}
      resizeMode="cover"
      className="rounded-full border-2 border-white"
    />
  );
};

export default DefaultMarker;
