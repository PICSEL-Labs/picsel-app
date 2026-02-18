import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useGetUser } from '@/feature/mypage/main/queries/useGetUser';
import { MypageNavigationProp } from '@/navigation/types/navigateTypeUtil';
import {
  useNicknameValidation,
  useKeyboardHeight,
  updateNicknameApi,
} from '@/shared/nickname';
import { useToastStore } from '@/shared/store/ui/toast';

export const useEditNickname = () => {
  const navigation = useNavigation<MypageNavigationProp>();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { data: user } = useGetUser();
  const nicknameValidation = useNicknameValidation();
  const { keyboardHeight } = useKeyboardHeight();

  const currentNickname = user?.userNickname ?? null;

  const isSameAsCurrentNickname =
    nicknameValidation.userNickname === currentNickname;

  const errorMessage = isSameAsCurrentNickname
    ? '현재 닉네임과 동일한 닉네임이에요'
    : nicknameValidation.errorMessage;

  const isSubmittable =
    nicknameValidation.isAvailable && !isSameAsCurrentNickname;

  const handleSubmit = async () => {
    if (!isSubmittable) {
      return;
    }

    try {
      await updateNicknameApi(nicknameValidation.userNickname);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      showToast('닉네임 변경을 완료했어요');
      navigation.getParent()?.goBack();
    } catch (error) {
      showToast('닉네임 변경에 실패했어요');
      navigation.getParent()?.goBack();
    }
  };

  return {
    nicknameValidation,
    keyboardHeight,
    errorMessage,
    isSubmittable,
    handleSubmit,
  };
};
