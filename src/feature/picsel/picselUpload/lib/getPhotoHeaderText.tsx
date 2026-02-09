import React from 'react';

import { Text } from 'react-native';

export type PhotoVariant = 'main' | 'extra' | 'cover';

interface HeaderContent {
  title: string;
  desc: React.ReactNode;
}

export const getPhotoHeaderText = (variant: PhotoVariant): HeaderContent => {
  switch (variant) {
    case 'cover':
      return {
        title: '사진 선택',
        desc: (
          <Text className="text-center text-gray-500 headline-01">
            커버사진으로 지정할 <Text className="text-pink-500">사진 1장</Text>
            을 골라주세요.
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
            추가사진은 <Text className="text-pink-500">최대 10장</Text>까지 선택
            가능해요.
          </Text>
        ),
      };
    default:
      return {
        title: '',
        desc: null,
      };
  }
};
