import React from 'react';

import Apple from '@/assets/button/button-apple.svg';
import Google from '@/assets/button/button-google.svg';
import Kakao from '@/assets/button/button-kakao.svg';
import Naver from '@/assets/button/button-naver.svg';

interface Props {
  shape: 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';
}

const SocialButtons = ({ shape }: Props) => {
  switch (shape) {
    case 'KAKAO':
      return <Kakao />;
    case 'APPLE':
      return <Apple />;
    case 'GOOGLE':
      return <Google />;
    case 'NAVER':
      return <Naver />;
    default:
      return <Kakao />;
  }
};

export default SocialButtons;
