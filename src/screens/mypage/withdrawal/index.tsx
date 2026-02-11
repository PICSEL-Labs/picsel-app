import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MypageHeader from '@/feature/mypage/shared/components/ui/molecules/MypageHeader';
import WithdrawalContent from '@/feature/mypage/withdrawal/component/ui/organisms/WithdrawalContent';
import { useWithdrawal } from '@/feature/mypage/withdrawal/hooks/useWithdrawal';
import { useKeyboardEvent } from '@/shared/hooks/useKeyboardEvent';
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

  const { scrollViewRef, isKeyboardVisible, handleFocusInput } =
    useKeyboardEvent({ scrollToEndOnFocus: true });

  return (
    <SafeAreaView
      className="h-full w-full flex-1 bg-white"
      edges={['top', 'left', 'right']}>
      <MypageHeader title="탈퇴하기" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="pt-2">
            <Text className="text-gray-900 title-05">
              탈퇴하기 전 확인해주세요
            </Text>
          </View>

          <WithdrawalContent
            selectedReasons={selectedReasons}
            etcReason={etcReason}
            onToggleReason={handleToggleReason}
            onChangeEtcReason={setEtcReason}
            isEtcSelected={isEtcSelected}
            onFocusInput={handleFocusInput}
          />
        </ScrollView>

        <View className={`px-4 py-2 ${isKeyboardVisible ? '-mb-2' : 'mb-8'}`}>
          <Button
            text="탈퇴하기"
            color={isButtonDisabled ? 'disabled' : 'active'}
            textColor="white"
            disabled={isButtonDisabled}
            onPress={handleWithdraw}
            className="w-full"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WithdrawalScreen;
