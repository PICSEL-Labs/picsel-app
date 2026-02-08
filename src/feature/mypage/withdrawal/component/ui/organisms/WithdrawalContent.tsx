import React from 'react';

import { Text, View } from 'react-native';

import { WITHDRAWAL_REASONS } from '../../../constants/withdrawalText';
import ReasonCheckbox from '../molecules/ReasonCheckbox';

import EtcReasonInput from './EtcReasonInput';

interface Props {
  selectedReasons: string[];
  etcReason: string;
  onToggleReason: (id: string) => void;
  onChangeEtcReason: (text: string) => void;
  isEtcSelected: boolean;
}
const WithdrawalContent = ({
  selectedReasons,
  etcReason,
  onToggleReason,
  onChangeEtcReason,
  isEtcSelected,
}: Props) => {
  return (
    <View className="flex-1 pt-4">
      <View>
        <Text className="text-gray-900 headline-02">
          1. 모든 데이터는 삭제되며, 복구가 불가능해요.
        </Text>
      </View>

      <View className="pt-5">
        <Text className="text-gray-900 headline-02">
          2. 이용 중 불편했던 점을 모두 선택해주세요.
        </Text>

        <View className="pl-1">
          {WITHDRAWAL_REASONS.map(reason => (
            <ReasonCheckbox
              key={reason.id}
              id={reason.id}
              label={reason.label}
              isSelected={selectedReasons.includes(reason.id)}
              onToggle={onToggleReason}
            />
          ))}
        </View>

        {isEtcSelected && (
          <EtcReasonInput value={etcReason} onChangeText={onChangeEtcReason} />
        )}
      </View>
    </View>
  );
};

export default WithdrawalContent;
