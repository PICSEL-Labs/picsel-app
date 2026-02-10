import { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import { withdrawApi } from '../api/withdrawApi';
import { ETC_REASON_ID } from '../constants/withdrawalText';

import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { showConfirmModal } from '@/shared/lib/confirmModal';

export const useWithdrawal = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [etcReason, setEtcReason] = useState('');

  const handleToggleReason = useCallback((id: string) => {
    setSelectedReasons(prev => {
      if (prev.includes(id)) {
        if (id === ETC_REASON_ID) {
          setEtcReason('');
        }
        return prev.filter(reasonId => reasonId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const executeWithdrawal = useCallback(async () => {
    try {
      await withdrawApi();
      navigation.navigate('MypageWithdrawalSuccess');
    } catch (error) {
      console.error('Withdrawal error:', error);
    }
  }, [navigation]);

  const handleWithdraw = useCallback(() => {
    Keyboard.dismiss();
    showConfirmModal(
      '지금까지 저장된 모든 정보가 삭제되고,\n복구할 수 없어요.',
      executeWithdrawal,
      {
        title: '정말로 탈퇴할까요?',
        confirmText: '탈퇴하기',
        cancelText: '취소',
      },
    );
  }, [executeWithdrawal]);

  const isEtcSelected = selectedReasons.includes(ETC_REASON_ID);
  const isButtonDisabled =
    selectedReasons.length === 0 ||
    (isEtcSelected && etcReason.trim().length === 0);

  return {
    selectedReasons,
    etcReason,
    setEtcReason,
    handleToggleReason,
    handleWithdraw,
    isEtcSelected,
    isButtonDisabled,
  };
};
