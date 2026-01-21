import { useEffect, useState } from 'react';

interface UsePhotoDataOptions<T> {
  loadData: () => T[];
  delay?: number;
  deps?: any[];
}

interface UsePhotoDataReturn<T> {
  data: T[];
  isLoading: boolean;
  setData: (data: T[]) => void;
}

export const usePhotoData = <T>({
  loadData,
  delay = 1000,
  deps = [],
}: UsePhotoDataOptions<T>): UsePhotoDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const loadedData = loadData();
      setData(loadedData);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, deps);

  return {
    data,
    isLoading,
    setData,
  };
};
