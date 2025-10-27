import { useEffect } from 'react';

import { Image } from 'react-native';
import Config from 'react-native-config';

interface Brand {
  brandId: string;
  brandIconImageUrl: string;
}

interface Store {
  brandId: string;
}

export const useImagePrefetch = (stores?: Store[], brands?: Brand[]) => {
  useEffect(() => {
    if (!stores?.length || !brands?.length) {
      return;
    }

    const brandMap = new Map(brands.map(b => [b.brandId, b.brandIconImageUrl]));

    const imageUrls = stores
      .map(s => {
        const brandIconUrl = brandMap.get(s.brandId);
        return brandIconUrl ? `${Config.IMAGE_URL}${brandIconUrl}` : null;
      })
      .filter(Boolean);

    Promise.all(
      imageUrls.map(url =>
        Image.prefetch(url!).catch(err => {
          console.warn('Image prefetch failed:', url, err);
        }),
      ),
    ).then(() => {
      console.log('All images prefetched');
    });
  }, [stores, brands]);
};
