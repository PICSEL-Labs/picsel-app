interface FormatDateOptions {
  showYear?: boolean;
}

/**
 * 날짜를 한글 형식으로 포맷팅
 * @param dateString - ISO 날짜 문자열
 * @param options - 포맷 옵션 (showYear: 연도 표시 여부)
 * @returns 포맷된 날짜 문자열 (예: "2024년 1월 22일 (월)" or "1월 22일 (월)")
 */
export const formatDate = (
  dateString: string,
  options: FormatDateOptions = {},
): string => {
  const { showYear = true } = options;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[date.getDay()];

  if (showYear) {
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  }

  return `${month}월 ${day}일 (${dayOfWeek})`;
};

/**
 * 월을 한글 형식으로 포맷팅
 * @param month - 월 (1-12)
 * @returns 포맷된 월 문자열 (예: "1월")
 */
export const formatMonth = (month: number): string => {
  return `${month}월`;
};

/**
 * 연도를 한글 형식으로 포맷팅
 * @param year - 연도
 * @returns 포맷된 연도 문자열 (예: "2024년")
 */
export const formatYear = (year: number): string => {
  return `${year}년`;
};
