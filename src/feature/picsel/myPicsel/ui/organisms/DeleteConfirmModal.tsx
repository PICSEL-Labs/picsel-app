import React from 'react';

import { Modal, Pressable, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  photoCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({
  visible,
  photoCount,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-[#111114]/50">
        <View className="w-[290px] rounded-[22px] bg-white px-6 pb-6 pt-8">
          {/* Title */}
          <Text className="mb-1 text-center text-gray-900 headline-03">
            {photoCount}장의 사진을 삭제할까요?
          </Text>

          {/* Sub Text */}
          <Text className="mb-7 text-center text-gray-900 body-rg-02">
            삭제 시 복구가 불가능해요
          </Text>

          {/* 버튼 */}
          <View className="flex-row space-x-2">
            <Pressable
              onPress={onCancel}
              className="flex-1 rounded-[15px] bg-gray-50 py-3">
              <Text className="text-center text-gray-600 headline-02">
                취소
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className="flex-1 rounded-[15px] bg-primary-pink py-3">
              <Text className="text-center text-white headline-02">삭제</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmModal;
