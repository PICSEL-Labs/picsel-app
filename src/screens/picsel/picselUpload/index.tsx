import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { UPLOAD_STEP } from '@/feature/picsel/picselUpload/constants/step';
import { useUploadStep } from '@/feature/picsel/picselUpload/hooks/useUploadStep';
import PicselUploadLayout from '@/feature/picsel/picselUpload/ui/layout/PicselUploadLayout';
import DateLocationStep from '@/feature/picsel/picselUpload/ui/organisms/DateLocationStep';
import PhotoSelectStep from '@/feature/picsel/picselUpload/ui/organisms/PhotoSelectStep';
import PicselBookSelectStep from '@/feature/picsel/picselUpload/ui/organisms/PicselBookSelectStep';
import RecordWriteStep from '@/feature/picsel/picselUpload/ui/organisms/RecordWriteStep';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import ProgressBar from '@/shared/ui/molecules/ProgressBar';

const PicselUploadScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { step, goNext, goBack, isFirstStep } = useUploadStep();

  const handleBack = () => {
    if (isFirstStep) {
      navigation.goBack();
    } else {
      goBack();
    }
  };

  const renderStep = () => {
    switch (step) {
      case UPLOAD_STEP.PHOTO_SELECT:
        return <PhotoSelectStep onNext={goNext} />;
      case UPLOAD_STEP.DATE_LOCATION:
        return <DateLocationStep onNext={goNext} />;
      case UPLOAD_STEP.PICSEL_BOOK_SELECT:
        return <PicselBookSelectStep onNext={goNext} />;
      case UPLOAD_STEP.RECORD_WRITE:
        return <RecordWriteStep onNext={goNext} />;
      default:
        return null;
    }
  };

  return (
    <PicselUploadLayout onBack={handleBack}>
      <ProgressBar
        currentStep={step}
        totalStep={Object.keys(UPLOAD_STEP).length}
      />
      {renderStep()}
    </PicselUploadLayout>
  );
};

export default PicselUploadScreen;
