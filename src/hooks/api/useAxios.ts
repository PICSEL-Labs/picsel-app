import { useState, useEffect, useRef } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';

import { axiosInstance } from '@/shared/lib/api/axiosInstance';

export const useAxios = <D = any>(axiosParams: AxiosRequestConfig<D>) => {
  const [response, setResponse] = useState<D | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);
  const controllerRef = useRef(new AbortController());

  const refetch = () => {
    setLoading(true);
    setTrigger(Date.now());
  };

  const axiosData = async (params: AxiosRequestConfig<D>) => {
    try {
      const result = await axiosInstance.request({
        ...params,
        signal: controllerRef.current.signal,
      });
      setResponse(result?.data?.data);
    } catch (err: AxiosError | any | unknown) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosData(axiosParams);
  }, [trigger]);

  return {
    response,
    error,
    loading,
    setResponse,
    refetch,
  };
};
