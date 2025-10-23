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
  return `${Math.round(distance * 1000)}m`;
};
