import React from 'react';

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useConfirmModalStore } from '@/shared/store/ui/confirmModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_WIDTH = Math.min(SCREEN_WIDTH * 0.8, 400);

const ConfirmModal = () => {
  const { visible, config, confirm, cancel } = useConfirmModalStore();

  if (!visible || !config) {
    return null;
  }

  const { title, message, confirmText = '확인', cancelText = '취소' } = config;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={cancel}>
      <TouchableWithoutFeedback onPress={cancel}>
        <View className="flex-1 items-center justify-center bg-[#11111480]">
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View
              className="rounded-[24px] bg-white px-6 pb-6 pt-8"
              style={{ width: MODAL_WIDTH }}>
              {/* Title */}
              {title && (
                <Text className="mb-1 text-center text-gray-900 headline-03">
                  {title}
                </Text>
              )}

              {/* Message */}
              <Text
                className={`text-center text-gray-900 body-rg-02 ${title ? 'mb-7' : 'mb-7'}`}>
                {message}
              </Text>

              {/* Buttons */}
              <View className="flex-row space-x-2">
                <Pressable
                  onPress={cancel}
                  className="flex-1 rounded-[12px] bg-gray-50 py-3">
                  <Text className="text-center text-gray-600 headline-02">
                    {cancelText}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={confirm}
                  className="flex-1 rounded-[12px] bg-primary-pink py-3">
                  <Text className="text-center text-white headline-02">
                    {confirmText}
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;
