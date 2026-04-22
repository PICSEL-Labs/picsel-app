import { NICKNAME_VALIDATION } from '@/shared/constants/validate/nicknameValidate';

export const validateNickname = (nickname: string): string | null => {
  const { REGEX, LENGTH, ERROR_MESSAGE } = NICKNAME_VALIDATION;

  if (REGEX.WHITESPACE.test(nickname)) {
    return ERROR_MESSAGE.WHITESPACE;
  }

  if (nickname.length < LENGTH.MIN || nickname.length > LENGTH.MAX) {
    return ERROR_MESSAGE.LENGTH;
  }

  if (!REGEX.ALLOWED_CHARACTERS.test(nickname)) {
    return ERROR_MESSAGE.INVALID_CHARACTERS;
  }

  return null;
};
