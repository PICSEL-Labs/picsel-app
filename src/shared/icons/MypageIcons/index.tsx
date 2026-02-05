import React from 'react';

import Announcement from '@/assets/icons/mypage/icon-announcement.svg';
import Edit from '@/assets/icons/mypage/icon-edit-name.svg';
import File from '@/assets/icons/mypage/icon-file.svg';
import Help from '@/assets/icons/mypage/icon-help.svg';
import InfoCircle from '@/assets/icons/mypage/icon-info-circle.svg';
import My from '@/assets/icons/mypage/icon-my.svg';
import Setting from '@/assets/icons/mypage/icon-setting.svg';
import Star from '@/assets/icons/mypage/icon-star.svg';

interface Props {
  shape:
    | 'setting'
    | 'edit-name'
    | 'announcement'
    | 'help'
    | 'star'
    | 'my'
    | 'info-circle'
    | 'file';
  width: number;
  height: number;
}

const MypageIcons = ({ shape, width, height }: Props) => {
  switch (shape) {
    case 'setting':
      return <Setting width={width} height={height} />;
    case 'edit-name':
      return <Edit width={width} height={height} />;
    case 'announcement':
      return <Announcement width={width} height={height} />;
    case 'help':
      return <Help width={width} height={height} />;
    case 'star':
      return <Star width={width} height={height} />;
    case 'my':
      return <My width={width} height={height} />;
    case 'info-circle':
      return <InfoCircle width={width} height={height} />;
    case 'file':
      return <File width={width} height={height} />;
    default:
      return <Setting width={width} height={height} />;
  }
};

export default MypageIcons;
