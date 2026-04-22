import React from 'react';

import Delete from '@/assets/icons/picselAction/icon-delete.svg';
import Edit from '@/assets/icons/picselAction/icon-edit.svg';
import Moving from '@/assets/icons/picselAction/icon-moving.svg';
import Save from '@/assets/icons/picselAction/icon-save.svg';
import Share from '@/assets/icons/picselAction/icon-share.svg';

interface Props {
  shape: 'delete' | 'move' | 'edit' | 'share' | 'save';
  width: number;
  height: number;
  color?: string;
}

const PicselActionIcons = ({
  shape,
  width,
  height,
  color = '#F91E34',
}: Props) => {
  switch (shape) {
    case 'delete':
      return <Delete width={width} height={height} color={color} />;
    case 'move':
      return <Moving width={width} height={height} />;
    case 'edit':
      return <Edit width={width} height={height} />;
    case 'share':
      return <Share width={width} height={height} />;
    case 'save':
      return <Save width={width} height={height} />;
    default:
      return <Delete width={width} height={height} />;
  }
};

export default PicselActionIcons;
