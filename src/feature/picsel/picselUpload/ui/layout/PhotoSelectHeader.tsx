import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface Props {
  variant: 'main' | 'extra' | 'cover';
  onReset?: () => void;
  hasSelected?: boolean;
  albumName: string;
  isAlbumListOpen: boolean;
  onToggleAlbumList: () => void;
}

const PhotoSelectHeader = ({
  variant,
  onReset,
  hasSelected,
  albumName,
  isAlbumListOpen,
  onToggleAlbumList,
}: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(isAlbumListOpen ? 180 : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [isAlbumListOpen]);

  const toggleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const getHeaderText = () => {
    switch (variant) {
      case 'cover':
        return {
          title: '사진 선택',
          desc: (
            <Text className="text-center text-gray-500 headline-01">
              커버사진으로 지정할{' '}
              <Text className="text-pink-500">사진 1장</Text>을 골라주세요.
            </Text>
          ),
        };
      case 'main':
        return {
          title: '사진 등록',
          desc: (
            <Text className="text-center text-gray-500 headline-01">
              대표사진으로 지정할{' '}
              <Text className="text-pink-500">네컷사진 1장</Text>을 골라주세요.
            </Text>
          ),
        };
      case 'extra':
        return {
          title: '사진 등록',
          desc: (
            <Text className="text-center text-gray-500 headline-01">
              추가사진은 <Text className="text-pink-500">최대 10장</Text>까지
              선택 가능해요.
            </Text>
          ),
        };
    }
  };

  const content = getHeaderText();

  return (
    <>
      <View className="relative flex-row items-center justify-center px-4 py-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute left-5 items-start">
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="text-center text-gray-900 title-01">
          {content.title}
        </Text>
        {hasSelected && (
          <Pressable
            onPress={onReset}
            className="absolute right-5 flex-row items-center justify-end">
            <Text className="text-pink-500 headline-02">초기화</Text>
            <ReplayIcons width={24} height={24} shape="true" />
          </Pressable>
        )}
      </View>

      <View className="px-1 py-2">{content.desc}</View>

      <View className="border-b border-gray-100 px-5 py-2">
        <Pressable
          onPress={onToggleAlbumList}
          className="flex-row items-center self-start"
          style={{ gap: 4 }}>
          <Text className="text-gray-900 headline-03">{albumName}</Text>
          <Animated.View style={toggleAnimatedStyle}>
            <ToggleIcons shape="down" width={24} height={24} />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
};

export default PhotoSelectHeader;
