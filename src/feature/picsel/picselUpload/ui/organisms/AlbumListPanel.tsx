import React, { useEffect, useState } from 'react';

import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Album } from '../../hooks/useAlbumList';

interface Props {
  albums: Album[];
  selectedAlbum: string | null;
  isVisible: boolean;
  onSelectAlbum: (albumTitle: string) => void;
}

const SLIDE_DURATION = 250;
const PANEL_HEIGHT = 400;

const AlbumListPanel = ({
  albums,
  selectedAlbum,
  isVisible,
  onSelectAlbum,
}: Props) => {
  const [shouldRender, setShouldRender] = useState(false);
  const translateY = useSharedValue(-PANEL_HEIGHT);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (shouldRender && isVisible) {
      translateY.value = -PANEL_HEIGHT;
      requestAnimationFrame(() => {
        translateY.value = withTiming(0, {
          duration: SLIDE_DURATION,
          easing: Easing.out(Easing.cubic),
        });
      });
    }
  }, [shouldRender, isVisible]);

  useEffect(() => {
    if (!isVisible && shouldRender) {
      translateY.value = withTiming(
        -PANEL_HEIGHT,
        { duration: SLIDE_DURATION, easing: Easing.in(Easing.cubic) },
        () => {
          runOnJS(setShouldRender)(false);
        },
      );
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!shouldRender) {
    return null;
  }

  const renderAlbumItem = ({ item }: { item: Album }) => {
    const isSelected = item.title === selectedAlbum;

    return (
      <Pressable
        onPress={() => onSelectAlbum(item.title)}
        className="flex-row items-center border-b border-gray-100 px-5 py-3"
        style={{ gap: 12 }}>
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
            className={`headline-03 ${isSelected ? 'text-pink-500' : 'text-gray-900'}`}>
            {item.title}
          </Text>
          <Text className="text-gray-500 body-rg-01">
            {item.count.toLocaleString()}
          </Text>
        </View>
      </Pressable>
    );
  };

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
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}>
      <FlatList
        data={albums}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={renderAlbumItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ maxHeight: PANEL_HEIGHT }}
      />
    </Animated.View>
  );
};

export default AlbumListPanel;
