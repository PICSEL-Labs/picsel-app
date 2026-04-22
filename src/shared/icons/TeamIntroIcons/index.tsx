import React from 'react';

import Heart from '@/assets/icons/teamIntro/icon-heart.svg';
import Instagram from '@/assets/icons/teamIntro/icon-instagram.svg';
import Star from '@/assets/icons/teamIntro/icon-star-pink.svg';

interface Props {
  shape: 'heart' | 'instagram' | 'star';
  width: number;
  height: number;
}

const TeamIntroIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'heart':
      return <Heart width={width} height={height} />;
    case 'instagram':
      return <Instagram width={width} height={height} />;
    case 'star':
      return <Star width={width} height={height} />;
    default:
      return <Heart width={width} height={height} />;
  }
};

export default TeamIntroIcons;
