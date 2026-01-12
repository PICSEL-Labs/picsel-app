import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import ArrowIcons from '@/shared/icons/ArrowIcons';
import ReplayIcons from '@/shared/icons/ReplayIcon';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

interface Props {
  variant: 'main' | 'extra'; // 대표사진 / 추가사진
  onReset?: () => void;
  hasSelected?: boolean;
}

const SelectPhotoHeader = ({ variant, onReset, hasSelected }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isMain = variant === 'main'; // 대표 사진을 선택하는 화면인 경우

  return (
    <>
      <View className="relative flex-row items-center justify-center px-4 py-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute left-5 items-start">
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="text-center text-gray-900 title-01">사진 등록</Text>
        {hasSelected && (
          <Pressable
            onPress={onReset}
            className="absolute right-5 flex-row items-center justify-end">
            <Text className="text-pink-500 headline-02">초기화</Text>
            <ReplayIcons width={24} height={24} shape="true" />
          </Pressable>
        )}
      </View>

      <View className="px-1 py-2">
        {isMain ? (
          <Text className="text-center text-gray-500 headline-01">
            대표사진으로 지정할{' '}
            <Text className="text-pink-500">네컷사진 1장</Text>을 골라주세요.
          </Text>
        ) : (
          <Text className="text-center text-gray-500 headline-01">
            추가사진은 <Text className="text-pink-500">최대 10장</Text>까지 선택
            가능해요.
          </Text>
        )}
      </View>
    </>
  );
};

export default SelectPhotoHeader;
