import React from 'react';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { usePhotoPicker } from '@/feature/picselUpload/hooks/usePhotoPicker';
import SelectPhotoHeader from '@/feature/picselUpload/ui/layout/PhotoSelectHeader';
import { PhotoGrid } from '@/feature/picselUpload/ui/organisms/PhotoGrid';
import { MainNavigationProps } from '@/navigation';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';

type SelectPhotoRouteProp = RouteProp<MainNavigationProps, 'SelectPhoto'>;

const SelectPhotoScreen = ({ route }: { route: SelectPhotoRouteProp }) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { variant } = route.params;

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

    navigation.navigate('RegisterPhoto', {
      variant,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <SelectPhotoHeader
        variant={variant}
        onReset={resetSelection}
        hasSelected={!!selectedUris}
      />

      <PhotoGrid
        photos={photos}
        selectedUris={selectedUris}
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
