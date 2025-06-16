export const validateFormat = (nickname: string): string | null => {
  if (/\s/.test(nickname)) return '닉네임에는 공백을 포함할 수 없어요';
  if (nickname.length < 2 || nickname.length > 12)
    return '2자 이상 12자 이하로 입력해주세요';
  if (!/^[가-힣a-zA-Z0-9\-._~]+$/.test(nickname))
    return '특수문자는 - . _ ~만 가능해요';
  return null;
};
