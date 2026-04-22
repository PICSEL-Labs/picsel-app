import React from 'react';

import { View } from 'react-native';

import ListItem from '../molecules/ListItem';

interface ListItemData {
  id: string;
  label: string;
  onPress: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

interface ListGroupProps {
  items: ListItemData[];
  className?: string;
}

const ListGroup = ({ items, className = '' }: ListGroupProps) => {
  return (
    <View className={`flex w-full flex-col items-start ${className} px-4`}>
      {items.map(item => (
        <ListItem
          key={item.id}
          label={item.label}
          onPress={item.onPress}
          rightIcon={item.rightIcon}
          leftIcon={item.leftIcon}
        />
      ))}
    </View>
  );
};

export default ListGroup;
