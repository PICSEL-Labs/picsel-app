import React from 'react';

import { View } from 'react-native';

import WithdrawalSuccessContent from '@/feature/mypage/withdrawal/component/ui/organisms/WithdrawalSuccessContent';
import { useWithdrawalSuccess } from '@/feature/mypage/withdrawal/hooks/useWithdrawalSuccess';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import Button from '@/shared/ui/atoms/Button';

const WithdrawalSuccessScreen = () => {
  const { handleComplete } = useWithdrawalSuccess();

  return (
    <ScreenLayout>
      <WithdrawalSuccessContent />

      <View className="px-4 pb-4">
        <Button
          text="완료"
          textColor="white"
          className="w-full"
          onPress={handleComplete}
        />
      </View>
    </ScreenLayout>
  );
};

export default WithdrawalSuccessScreen;
