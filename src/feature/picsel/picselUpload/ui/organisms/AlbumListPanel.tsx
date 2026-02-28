import React, { memo, useCallback, useEffect, useState } from 'react';

import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ALBUM_PANEL, ITEM_HEIGHT } from '../../constants/album';
import { Album } from '../../hooks/useAlbumList';

interface Props {
  albums: Album[];
  selectedAlbum: string | null;
  isVisible: boolean;
  onSelectAlbum: (albumTitle: string) => void;
}

const AlbumItem = memo(
  ({
    item,
    isSelected,
    onPress,
  }: {
    item: Album;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center border-b border-gray-100 px-5 py-3"
      style={{ height: ITEM_HEIGHT, gap: 12 }}>
      {item.thumbnailUri ? (
        <Image
          source={{ uri: item.thumbnailUri }}
          className="h-14 w-14 rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="h-14 w-14 items-center justify-center rounded-lg bg-gray-200" />
      )}
      <View className="flex-1">
        <Text
          className={`${isSelected ? 'text-pink-500' : 'text-gray-900'} headline-01`}>
          {item.title}
        </Text>
        <Text className="text-gray-500 body-rg-01">
          {item.count.toLocaleString()}
        </Text>
      </View>
    </Pressable>
  ),
);

const getItemLayout = (_: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const AlbumListPanel = ({
  albums,
  selectedAlbum,
  isVisible,
  onSelectAlbum,
}: Props) => {
  const [shouldRender, setShouldRender] = useState(false);
  const height = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (shouldRender && isVisible) {
      height.value = 0;
      requestAnimationFrame(() => {
        height.value = withTiming(ALBUM_PANEL.SCREEN_HEIGHT, {
          duration: ALBUM_PANEL.SLIDE_DURATION,
          easing: Easing.out(Easing.cubic),
        });
      });
    }
  }, [shouldRender, isVisible]);

  useEffect(() => {
    if (!isVisible && shouldRender) {
      height.value = withTiming(
        0,
        {
          duration: ALBUM_PANEL.SLIDE_DURATION,
          easing: Easing.in(Easing.cubic),
        },
        () => {
          runOnJS(setShouldRender)(false);
        },
      );
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const renderAlbumItem = useCallback(
    ({ item }: { item: Album }) => (
      <AlbumItem
        item={item}
        isSelected={item.title === selectedAlbum}
        onPress={() => onSelectAlbum(item.title)}
      />
    ),
    [selectedAlbum, onSelectAlbum],
  );

  const keyExtractor = useCallback(
    (item: Album, index: number) => `${item.title}-${index}`,
    [],
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}>
      <FlatList
        data={albums}
        keyExtractor={keyExtractor}
        renderItem={renderAlbumItem}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
};

export default AlbumListPanel;
