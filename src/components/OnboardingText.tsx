import React from 'react';

// components/OnboardingText.tsx -> 임시
import { Text } from 'react-native';

interface OnboardingTextProps {
  text: string;
}

// 온보딩 텍스트 data -> 임시
export const onboardingShowData = [
  {
    id: 0,
    text: '여기저기\n흩어져 있는 포토부스,\n찾는데 헤맨 적 있나요?',
    color: 'bg-gray-100',
  },
  {
    id: 1,
    text: '원하는 브랜드를\n쉽고 빠르게 검색할 수 있어요!',
    color: 'bg-gray-200',
  },
  {
    id: 2,
    text: '갤러리 속\n구석에 숨겨진 네컷사진,\n다시 꺼내기 어렵지 않았나요?',
    color: 'bg-gray-300',
  },
  {
    id: 3,
    text: '그날의 사진, 장소, 추억까지\n모두 [픽셀북]에 저장해보세요!',
    color: 'bg-gray-400',
  },

  {
    id: 4,
    text: '세상의 모든 포토부스\n검색부터 보관까지\n모두 [PICSEL]에서 더 쉽고 즐겁게!',
    color: 'bg-gray-500',
  },
];

// text bold-color 처리 hooks
export const OnboardingText = ({ text }: OnboardingTextProps) => {
  const parts = text.split(/(\[.*?\])/g); // [강조할 부분] 분리

  return (
    // 메인 텍스트
    <Text className="text-center text-[24px] font-semibold leading-9 bottom-8 h-[110px]">
      {parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          const content = part.slice(1, -1);
          return (
            // 강조 텍스트
            <Text key={index} className="text-pink-500 font-extrabold">
              {content}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};
