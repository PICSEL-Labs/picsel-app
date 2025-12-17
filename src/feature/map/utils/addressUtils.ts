export const splitAddress = (fullAddress: string) => {
  const parts = fullAddress.split(' ');
  if (parts.length > 3) {
    return {
      location: parts.slice(0, 3).join(' '),
      detailLocation: parts.slice(3, -1).join(' '),
    };
  }
  return {
    location: fullAddress,
    detailLocation: fullAddress,
  };
};

export const formatDistance = (distance: number): string => {
  // distance가 undefined, null, NaN 등일 경우 0으로 처리
  const validDistance = distance ?? 0;
  const meters = Math.round(validDistance * 1000);

  // 1000m 이상이면 km로 변환하여 표시
  if (meters >= 1000) {
    const km = meters / 1000;
    const formattedKm = Number.isInteger(km) ? km.toFixed(0) : km.toFixed(1);
    return `${formattedKm}km`;
  }

  return `${meters}m`;
};
