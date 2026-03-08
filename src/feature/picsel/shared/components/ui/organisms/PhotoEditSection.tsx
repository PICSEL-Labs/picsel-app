import React from 'react';

import { Text, View } from 'react-native';

import ExtraPhotoList from '@/feature/picsel/picselUpload/ui/organisms/ExtraPhotoList';
import MainPhotoCard from '@/feature/picsel/picselUpload/ui/organisms/MainPhotoCard';

interface Props {
  mainPhoto: string | null;
  extraPhotos: string[];
  onDeleteMainPhoto: () => void;
  onSelectMainPhoto: () => void;
  onAddExtraPhoto: () => void;
  onRemoveExtraPhoto: (index: number) => void;
}

const PhotoEditSection = ({
  mainPhoto,
  extraPhotos,
  onDeleteMainPhoto,
  onSelectMainPhoto,
  onAddExtraPhoto,
  onRemoveExtraPhoto,
}: Props) => {
  return (
    <>
      <View className="px-4 py-6">
        <Text className="text-gray-900 headline-02">대표사진</Text>
        <MainPhotoCard
          uri={mainPhoto}
          onDelete={onDeleteMainPhoto}
          onSelect={onSelectMainPhoto}
        />
      </View>

      <View className="pb-12">
        <ExtraPhotoList
          photos={extraPhotos}
          onAdd={onAddExtraPhoto}
          onRemove={onRemoveExtraPhoto}
        />
      </View>
    </>
  );
};

export default PhotoEditSection;
