import React from 'react';

import StarIcons from '@/shared/icons/StarIcons';

interface Props {
  iconType: string;
}

const MenuCardIcon = ({ iconType }: Props) => {
  switch (iconType) {
    case 'star':
      return <StarIcons shape="empty" width={24} height={24} />;
    default:
      return null;
  }
};

export default MenuCardIcon;
