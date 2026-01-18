import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import AddPhotoItem from '../molecules/AddPhotoItem';
import ExtraPhotoCard from '../molecules/ExtraPhotoCard';

interface Props {
  photos: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const ExtraPhotoList = ({ photos, onAdd, onRemove }: Props) => {
  return (
    <View className="flex-col gap-2">
      <Text className="px-5 text-gray-900 headline-02">추가사진</Text>

      <View className="h-[96px] flex-row items-end">
        <View className="pl-4">
          <AddPhotoItem count={photos.length} onPress={onAdd} />
        </View>
        <ScrollView
          horizontal
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}>
          {photos.map((uri, index) => (
            <ExtraPhotoCard
              key={`${uri}-${index}`}
              uri={uri}
              onDelete={() => onRemove(index)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ExtraPhotoList;
