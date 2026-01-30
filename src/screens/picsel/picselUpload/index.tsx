import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useUploadStep } from '@/feature/picsel/picselUpload/hooks/useUploadStep';
import PicselUploadLayout from '@/feature/picsel/picselUpload/ui/layout/PicselUploadLayout';
import DateLocationStep from '@/feature/picsel/picselUpload/ui/organisms/DateLocationStep';
import PhotoSelectStep from '@/feature/picsel/picselUpload/ui/organisms/PhotoSelectStep';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ProgressBar from '@/shared/ui/molecules/ProgressBar';

const PicselUploadScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { step, goNext, goBack, isFirstStep } = useUploadStep();

  const [uploadData, setUploadData] = useState({
    date: '',
    location: '',
  });

  const handleBack = () => {
    if (isFirstStep) {
      navigation.goBack();
    } else {
      goBack();
    }
  };

  const handleDateLocationConfirm = (date: string, location: string) => {
    setUploadData({ date, location });
    goNext();
  };

  return (
    <PicselUploadLayout onBack={handleBack}>
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
