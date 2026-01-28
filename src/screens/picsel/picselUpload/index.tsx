import React, { useState } from 'react';

import { useUploadStep } from '@/feature/picsel/picselUpload/hooks/useUploadStep';
import PicselUploadLayout from '@/feature/picsel/picselUpload/ui/layout/PicselUploadLayout';
import DateLocationStep from '@/feature/picsel/picselUpload/ui/organisms/DateLocationStep';
import PhotoSelectStep from '@/feature/picsel/picselUpload/ui/organisms/PhotoSelectStep';
import ProgressBar from '@/shared/ui/molecules/ProgressBar';

const PicselUploadScreen = () => {
  const { step, goNext } = useUploadStep();

  const [uploadData, setUploadData] = useState({
    date: '',
    location: '',
  });

  const handleDateLocationConfirm = (date: string, location: string) => {
    setUploadData({ date, location });
    goNext();
  };

  return (
    <PicselUploadLayout>
      <ProgressBar currentStep={step} totalStep={4} />

      {step === 1 && <PhotoSelectStep onNext={goNext} />}

      {step === 2 && (
        <DateLocationStep
          onNext={handleDateLocationConfirm}
          initialData={uploadData}
        />
      )}
    </PicselUploadLayout>
  );
};

export default PicselUploadScreen;
