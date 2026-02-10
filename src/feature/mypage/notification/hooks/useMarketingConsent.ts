import { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MARKETING_CONSENT_KEY = 'marketing-consent';

interface MarketingConsentData {
  isConsented: boolean;
  consentedAt: string | null;
  rejectedAt: string | null;
}

const DEFAULT_CONSENT: MarketingConsentData = {
  isConsented: false,
  consentedAt: null,
  rejectedAt: null,
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const useMarketingConsent = () => {
  const [consent, setConsent] = useState<MarketingConsentData>(DEFAULT_CONSENT);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadConsent = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(MARKETING_CONSENT_KEY);
      if (stored) {
        setConsent(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Marketing consent load error:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadConsent();
  }, [loadConsent]);

  const saveConsent = useCallback(async (data: MarketingConsentData) => {
    try {
      await AsyncStorage.setItem(MARKETING_CONSENT_KEY, JSON.stringify(data));
      setConsent(data);
    } catch (error) {
      console.error('Marketing consent save error:', error);
    }
  }, []);

  const agreeMarketing = useCallback(async (): Promise<string> => {
    const now = new Date();
    const dateStr = formatDate(now);
    await saveConsent({
      isConsented: true,
      consentedAt: dateStr,
      rejectedAt: null,
    });
    return dateStr;
  }, [saveConsent]);

  const rejectMarketing = useCallback(async (): Promise<string> => {
    const now = new Date();
    const dateStr = formatDate(now);
    await saveConsent({
      isConsented: false,
      consentedAt: consent.consentedAt,
      rejectedAt: dateStr,
    });
    return dateStr;
  }, [saveConsent, consent.consentedAt]);

  return {
    isConsented: consent.isConsented,
    consentedAt: consent.consentedAt,
    isLoaded,
    agreeMarketing,
    rejectMarketing,
  };
};
