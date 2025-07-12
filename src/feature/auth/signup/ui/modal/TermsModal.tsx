import React, { Dispatch, SetStateAction } from 'react';

import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useModalService } from '../../model/useModalService';

import TermsAgreementList from './TermsAgreementList';
import TermsModalHeader from './TermsModalHeader';

import Button from '@/shared/ui/atoms/Button';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  handleSignup: () => Promise<void>;
  checkedStates: boolean[];
  setCheckedStates: Dispatch<SetStateAction<boolean[]>>;
  allChecked: boolean;
  isRequiredAllChecked: boolean;
  toggleAll: () => void;
  toggleItem: (index: number) => void;
}

const TermsModal = ({
  visible,
  onClose,
  title,
  handleSignup,
  checkedStates,
  setCheckedStates,
  allChecked,
  isRequiredAllChecked,
  toggleAll,
  toggleItem,
}: Props) => {
  const { panGesture, animatedStyle } = useModalService({
    visible,
    onClose,
    setCheckedStates,
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/30" />
      </TouchableWithoutFeedback>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animatedStyle}
          className="absolute bottom-0 max-h-[80%] w-full rounded-t-2xl bg-white px-4 pb-8 pt-2">
          <TermsModalHeader title={title} />

          <TermsAgreementList
            checkedStates={checkedStates}
            allChecked={allChecked}
            toggleAll={toggleAll}
            toggleItem={toggleItem}
          />

          <Button
            className="mb-3 self-center"
            text="완료"
            textColor="white"
            color={isRequiredAllChecked ? 'active' : 'disabled'}
            disabled={!isRequiredAllChecked}
            onPress={handleSignup}
          />
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

export default TermsModal;
