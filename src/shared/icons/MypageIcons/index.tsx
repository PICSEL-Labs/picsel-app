import React from 'react';

import Edit from '@/assets/icons/mypage/icon-edit-name.svg';
import Setting from '@/assets/icons/mypage/icon-setting.svg';

interface Props {
  shape: 'setting' | 'edit-name';
  width: number;
  height: number;
}

const MypageIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'setting':
      return <Setting width={width} height={height} />;
    case 'edit-name':
      return <Edit width={width} height={height} />;
    default:
      return <Setting width={width} height={height} />;
  }
};

export default MypageIcons;
