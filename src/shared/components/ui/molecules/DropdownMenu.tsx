import React, { Fragment, ReactNode } from 'react';

import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimatedStyle } from 'react-native-reanimated';

export interface DropdownMenuItem {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  textClassName?: string;
}

interface Props {
  isMounted: boolean;
  animatedStyle: AnimatedStyle;
  items: DropdownMenuItem[];
  onClose: () => void;
  top?: number;
  minWidth?: number;
}

const DropdownMenu = ({
  isMounted,
  animatedStyle,
  items,
  onClose,
  top = 115,
  minWidth = 250,
}: Props) => {
  return (
    <Modal
      transparent
      visible={isMounted}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1">
          <Animated.View
            className="absolute right-4"
            style={[
              animatedStyle,
              {
                top,
                backgroundColor: 'rgba(255, 255, 255, 0.962)',
                borderRadius: 12,
                boxShadow: '0 0 32px 0 rgba(0, 0, 0, 0.20)',
                minWidth,
              },
            ]}>
            {items.map((item, index) => (
              <Fragment key={index}>
                {index === items.length - 1 && items.length > 1 && (
                  <View
                    className="h-2"
                    style={{ backgroundColor: 'rgba(59, 62, 70, 0.08)' }}
                  />
                )}
                <Pressable
                  className="flex-row items-center justify-between px-4 py-2.5"
                  onPress={item.onPress}>
                  <Text
                    className={
                      item.textClassName ?? 'text-primary-black body-rg-04'
                    }>
                    {item.label}
                  </Text>
                  {item.icon}
                </Pressable>
              </Fragment>
            ))}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DropdownMenu;
