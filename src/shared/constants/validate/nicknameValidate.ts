export const NICKNAME_VALIDATION = {
  REGEX: {
    WHITESPACE: /\s/,
    ALLOWED_CHARACTERS: /^[가-힣a-zA-Z0-9\-._~]+$/,
  },
  LENGTH: {
    MIN: 2,
    MAX: 12,
  },
  ERROR_MESSAGE: {
    WHITESPACE: '닉네임에는 공백을 포함할 수 없어요',
    LENGTH: '2자 이상 12자 이하로 입력해주세요',
    INVALID_CHARACTERS: '특수문자는 - . _ ~만 가능해요',
  },
} as const;
