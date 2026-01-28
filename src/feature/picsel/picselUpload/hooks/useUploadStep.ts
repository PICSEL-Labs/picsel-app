import { useCallback, useState } from 'react';

const MAX_STEP = 4;

export const useUploadStep = () => {
  const [step, setStep] = useState(1);

  const goNext = useCallback(() => {
    setStep(prev => (prev < MAX_STEP ? prev + 1 : prev));
  }, []);

  const goBack = useCallback(() => {
    setStep(prev => (prev > 1 ? prev - 1 : prev));
  }, []);

  const isLastStep = step === MAX_STEP;
  const isFirstStep = step === 1;

  return {
    step,
    goNext,
    goBack,
    isLastStep,
    isFirstStep,
  };
};
