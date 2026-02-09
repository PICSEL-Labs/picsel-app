import React, { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { usePicselBook } from '@/feature/picsel/picselBook/hooks/usePicselBook';
import { usePhotoPicker } from '@/feature/picsel/picselUpload/hooks/usePhotoPicker';
import { usePicselUploadStore } from '@/feature/picsel/picselUpload/hooks/usePicselUploadStore';
import PhotoSelectHeader from '@/feature/picsel/picselUpload/ui/layout/PhotoSelectHeader';
import { PhotoGrid } from '@/feature/picsel/picselUpload/ui/organisms/PhotoGrid';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
import { MainNavigationProps } from '@/navigation';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';

type SelectPhotoRouteProp =
  | RouteProp<MainNavigationProps, 'SelectMainPhoto'>
  | RouteProp<MainNavigationProps, 'SelectExtraPhoto'>
  | RouteProp<MainNavigationProps, 'SelectBookCover'>;

const SelectPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<SelectPhotoRouteProp>();
  const variant = route.params.variant;
  const picselBookRef = useRef<BottomSheetModal>(null);

  const pendingBookName =
    route.params.variant === 'cover'
      ? (
          route.params as RouteProp<
            MainNavigationProps,
            'SelectBookCover'
          >['params']
        ).bookName
      : '';

  const { setMainPhoto, addExtraPhotos } = usePicselUploadStore();

  const {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  } = usePhotoPicker(variant);

  const { handleSubmit } = usePicselBook();

  const handleSelectedCompleted = () => {
    if (variant === 'main') {
      setMainPhoto(selectedUris[0]);
      navigation.navigate('PicselUpload');
    } else if (variant === 'extra') {
      addExtraPhotos(selectedUris);
      navigation.navigate('PicselUpload');
    } else if (variant === 'cover') {
      picselBookRef.current?.present();
    }
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

      <PicselBookBottomSheet
        ref={picselBookRef}
        initialBookName={pendingBookName}
        onSubmit={handleSubmit}
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
