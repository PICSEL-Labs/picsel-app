import React, { useEffect, useRef } from 'react';

import { Animated, Dimensions, Easing, Modal, Text, View } from 'react-native';

import SButton from '../../atoms/SButton';

import { modalShadow } from '@/styles/shadows';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  visible: boolean;

  title: string;
  description?: string;

  cancelText?: string;
  confirmText?: string;

  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  visible,
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: Props) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const isAnimatingRef = useRef(false);

  /** 열릴 때 (아래 → 위) */
  useEffect(() => {
    if (!visible) {
      return;
    }

    translateY.setValue(SCREEN_HEIGHT);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  /** 닫힐 때 (위 → 아래) */
  const slideDownAndClose = (callback: () => void) => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;

    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 350,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      isAnimatingRef.current = false;
      callback();
    });
  };

  const handleCancel = () => {
    slideDownAndClose(onCancel);
  };

  const handleConfirm = () => {
    slideDownAndClose(onConfirm);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/40">
        <Animated.View
          style={[modalShadow, { transform: [{ translateY }] }]}
          className="w-[288px] rounded-3xl bg-white px-5 pb-5 pt-8">
          <View className="gap-2 pb-6">
            <Text className="text-center text-gray-900 headline-03">
              {title}
            </Text>

            {description && (
              <Text className="text-center text-gray-900 body-rg-02">
                {description}
              </Text>
            )}
          </View>

          <View className="mt-6 flex-row gap-3">
            <SButton
              color="textOnly"
              textColor="gray"
              text={cancelText}
              activeOpacity={1}
              className="flex-1"
              onPress={handleCancel}
            />

            <SButton
              color="default"
              textColor="white"
              text={confirmText}
              className="flex-1"
              onPress={handleConfirm}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
