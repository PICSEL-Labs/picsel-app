export const formatDistance = (m?: number) => {
  const meters = m < 0 ? 0 : m;

  if (meters >= 1000) {
    const km = meters / 1000;
    const s = Number.isInteger(km) ? km.toFixed(0) : km.toFixed(1); // 정수면 소수점 제거
    return `${s}KM`;
  }
  return `${Math.round(meters)}M`;
};
