import React, { Fragment } from 'react';

import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useModalAnimation } from '@/shared/hooks/useModalAnimation';
import { useActionSheetStore } from '@/shared/store/ui/actionSheet';

export interface ActionSheetOption {
  label: string;
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const OPTION_WIDTH = Math.min(SCREEN_WIDTH - 32, 400);

const ActionSheet = () => {
  const { visible, config, hideActionSheet } = useActionSheetStore();
  const insets = useSafeAreaInsets();
  const { isVisible, currentConfig } = useModalAnimation(visible, config);

  if (!currentConfig) {
    return null;
  }

  const { options, cancelText = '취소' } = currentConfig;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={hideActionSheet}>
      <TouchableWithoutFeedback>
        <View className="flex-1 justify-end bg-[#11111480]">
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View
              className="mx-4"
              style={{ paddingBottom: insets.bottom + 10 }}>
              {/* Options */}
              <View
                className="mb-2 overflow-hidden rounded-[12px] bg-[#d7d7d7]"
                style={{ width: OPTION_WIDTH }}>
                {options.map((option, index) => (
                  <Fragment key={index}>
                    {index > 0 && <View className="h-[0.4px] bg-[#8080808C]" />}
                    <Pressable
                      onPress={() => {
                        option.onPress();
                        hideActionSheet();
                      }}
                      className="py-4">
                      <Text className="text-center text-[#007AFF] body-rg-03">
                        {option.label}
                      </Text>
                    </Pressable>
                  </Fragment>
                ))}
              </View>

              {/* Cancel Button */}
              <Pressable
                onPress={hideActionSheet}
                className="rounded-[12px] bg-white py-4"
                style={{ width: OPTION_WIDTH }}>
                <Text className="text-center text-[#007AFF] headline-02">
                  {cancelText}
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ActionSheet;
