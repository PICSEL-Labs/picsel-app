import React from 'react';

import { useTermSheet } from '../../model/useTermSheet';
import { TermsActions, TermsState } from '../../types';

import TermsAgreementList from './TermsAgreementList';

import Button from '@/shared/ui/atoms/Button';
import BottomSheet from '@/shared/ui/molecules/BottomSheet';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSignup: () => Promise<void>;
  termsState: TermsState;
  termsActions: TermsActions;
}

const TermsBottomSheet = ({
  visible,
  onClose,
  onSignup,
  termsActions,
  termsState,
}: Props) => {
  const { animatedStyle, panGesture } = useTermSheet({
    visible,
    onClose,
    setCheckedStates: termsState.setCheckedStates,
  });

  return (
    <BottomSheet
      onClose={onClose}
      title="이용약관 동의"
      visible={visible}
      animatedStyle={animatedStyle}
      panGesture={panGesture}
      backDrop>
      <TermsAgreementList
        checkedStates={termsState.checkedStates}
        allChecked={termsState.allChecked}
        toggleAll={termsActions.toggleAll}
        toggleItem={termsActions.toggleItem}
      />

      <Button
        className="mb-3 self-center"
        text="완료"
        textColor="white"
        color={termsState.isRequiredAllChecked ? 'active' : 'disabled'}
        disabled={!termsState.isRequiredAllChecked}
        onPress={onSignup}
      />
    </BottomSheet>
  );
};

export default TermsBottomSheet;
