import { useRef, useState } from 'react';

import { validateUserInfoApi } from '../api/validateApi';

import { validateFormat } from '@/feature/auth/signup/utils/validateNickname';

export const useNicknameValidation = () => {
  const [userNickname, setUserNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [focus, setFocus] = useState(false);

  const handleNicknameChange = (value: string) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    setUserNickname(value);
    setIsAvailable(null);
    setErrorMessage('');

    const error = validateFormat(value);
    if (error) {
      setErrorMessage(error);
      setIsValidFormat(false);
      return;
    }

    setIsValidFormat(true);
  };

  const handleBlur = () => {
    setFocus(false);

    if (!isValidFormat) {
      return;
    }

    blurTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await validateUserInfoApi(userNickname);

        if (res.code === 14001) {
          setIsAvailable(false);
          setErrorMessage('이미 사용 중인 닉네임이에요');
        } else if (res.code === 14003) {
          setIsAvailable(false);
          setErrorMessage('2자 이상 12자 이하로 입력해주세요');
        } else {
          setIsAvailable(true);
          setErrorMessage('');
        }
      } catch (err) {
        setIsAvailable(false);
        setErrorMessage('서버 오류가 발생했어요');
      }
    }, 500);
  };

  const handleClear = () => {
    setErrorMessage('');
    setUserNickname('');
    setIsAvailable(false);
  };

  return {
    userNickname,
    isAvailable,
    errorMessage,
    handleNicknameChange,
    handleBlur,
    focus,
    setFocus,
    handleClear,
  };
};
