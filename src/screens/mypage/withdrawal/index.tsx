import React from 'react';

import { Text, View } from 'react-native';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import WithdrawalContent from '@/feature/mypage/withdrawal/component/ui/organisms/WithdrawalContent';
import { useWithdrawal } from '@/feature/mypage/withdrawal/hooks/useWithdrawal';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import Button from '@/shared/ui/atoms/Button';

const WithdrawalScreen = () => {
  const {
    selectedReasons,
    etcReason,
    setEtcReason,
    handleToggleReason,
    handleWithdraw,
    isEtcSelected,
    isButtonDisabled,
  } = useWithdrawal();

  return (
    <ScreenLayout>
      <MypageHeader title="탈퇴하기" />

      <View className="flex-1 px-4">
        <View className="pt-2">
          <Text className="text-gray-900 title-05">
            탈퇴하기 전 확인해주세요
          </Text>
        </View>

        {/* 기타 (직접입력) -> 기획 디자인 파트 문의, 피그마 코멘트 */}
        <WithdrawalContent
          selectedReasons={selectedReasons}
          etcReason={etcReason}
          onToggleReason={handleToggleReason}
          onChangeEtcReason={setEtcReason}
          isEtcSelected={isEtcSelected}
        />

        <View className="pb-4">
          <Button
            text="탈퇴하기"
            color={isButtonDisabled ? 'disabled' : 'active'}
            textColor="white"
            disabled={isButtonDisabled}
            onPress={handleWithdraw}
            className="w-full"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default WithdrawalScreen;
