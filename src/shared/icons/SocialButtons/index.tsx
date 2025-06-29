import React from 'react';

import Apple from '@/assets/button/button-apple.svg';
import Google from '@/assets/button/button-google.svg';
import Kakao from '@/assets/button/button-kakao.svg';
import Naver from '@/assets/button/button-naver.svg';

interface Props {
  shape: 'kakao' | 'naver' | 'google' | 'apple';
}

const SocialButtons = ({ shape }: Props) => {
  switch (shape) {
    case 'kakao':
      return <Kakao />;
    case 'apple':
      return <Apple />;
    case 'google':
      return <Google />;
    case 'naver':
      return <Naver />;
    default:
      return <Kakao />;
  }
};

export default SocialButtons;
