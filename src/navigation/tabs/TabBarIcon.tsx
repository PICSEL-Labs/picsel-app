import React from 'react';

import BookIcons from '@/shared/icons/BookIcons';
import MapIcons from '@/shared/icons/MapIcons';
import MyIcons from '@/shared/icons/MyIcons';
import QrIcons from '@/shared/icons/QrIcons';

interface Props {
  routeName: string;
  focused: boolean;
}
const TabBarIcon = ({ routeName, focused }: Props) => {
  switch (routeName) {
    case 'HomeScreen':
      return (
        <MapIcons
          shape={focused ? 'fill-pink' : 'border-gray'}
          width={32}
          height={32}
        />
      );
    case 'QRScreen':
      return (
        <QrIcons shape={focused ? 'pink' : 'off-1'} width={32} height={32} />
      );
    case 'BookScreen':
      return (
        <BookIcons shape={focused ? 'fill' : 'gray'} width={32} height={32} />
      );
    case 'MyScreen':
      return (
        <MyIcons shape={focused ? 'fill' : 'gray'} width={32} height={32} />
      );
    default:
      return null;
  }
};

export default TabBarIcon;
