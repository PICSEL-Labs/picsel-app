import React from 'react';

import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { PhotoGrid } from '@/feature/uploadPhoto/components/ui/organisms/PhotoGrid';
import SelectPhotoHeader from '@/feature/uploadPhoto/components/ui/organisms/UploadPhotoHeader';
import { usePhotoPicker } from '@/feature/uploadPhoto/hooks/usePhotoPicker';

const PhotoUploadScreen = () => {
  const {
    photos,
    selectedUri,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  } = usePhotoPicker();

  const handleSelectedCompleted = async () => {
    console.log('선택 완료:', selectedUri); // 추후 스크린 이동으로 구현 예정
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <SelectPhotoHeader
        variant="main"
        onReset={resetSelection}
        hasSelected={!!selectedUri}
      />

      <PhotoGrid
        photos={photos}
        selectedUri={selectedUri}
        onSelectPhoto={handleSelectPhoto}
        onOpenCamera={handleOpenCamera}
        onLoadMore={fetchPhotos}
      />

      {selectedUri && (
        <View className="absolute bottom-6 left-0 right-0 px-5">
          <SelectButton
            disabled={!!selectedUri}
            actualSelectedCount={1}
            handleSelectedCompleted={handleSelectedCompleted}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;
