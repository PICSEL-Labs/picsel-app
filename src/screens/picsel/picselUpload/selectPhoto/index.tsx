import React from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { usePhotoPicker } from '@/feature/picsel/picselUpload/hooks/usePhotoPicker';
import PhotoSelectHeader from '@/feature/picsel/picselUpload/ui/layout/PhotoSelectHeader';
import { PhotoGrid } from '@/feature/picsel/picselUpload/ui/organisms/PhotoGrid';
import { MainNavigationProps } from '@/navigation';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';

type SelectPhotoRouteProp =
  | RouteProp<MainNavigationProps, 'SelectMainPhoto'>
  | RouteProp<MainNavigationProps, 'SelectExtraPhoto'>;

const SelectPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<SelectPhotoRouteProp>();
  const variant = route.params.variant;

  const { setMainPhoto, addExtraPhotos } = usePhotoStore();

  const {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  } = usePhotoPicker(variant);

  const handleSelectedCompleted = () => {
    if (variant === 'main') {
      setMainPhoto(selectedUris[0]);
    } else {
      addExtraPhotos(selectedUris);
    }
    navigation.navigate('PicselUpload');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <PhotoSelectHeader
        variant={variant}
        onReset={resetSelection}
        hasSelected={!!selectedUris}
      />

      <PhotoGrid
        photos={photos}
        selectedUris={selectedUris}
        variant={variant}
        onSelectPhoto={handleSelectPhoto}
        onOpenCamera={handleOpenCamera}
        onLoadMore={fetchPhotos}
      />

      {selectedCount > 0 && (
        <View className="absolute bottom-6 left-0 right-0 px-5">
          <SelectButton
            disabled={selectedCount === 0}
            actualSelectedCount={selectedCount}
            handleSelectedCompleted={handleSelectedCompleted}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SelectPhotoScreen;
