import React, { useEffect } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Linking, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { PHOTO_PERMISSION_ALERT } from '@/feature/picsel/picselUpload/constants/album';
import { useAlbumList } from '@/feature/picsel/picselUpload/hooks/useAlbumList';
import { usePhotoPicker } from '@/feature/picsel/picselUpload/hooks/usePhotoPicker';
import { usePicselUploadStore } from '@/feature/picsel/picselUpload/hooks/usePicselUploadStore';
import PhotoSelectHeader from '@/feature/picsel/picselUpload/ui/layout/PhotoSelectHeader';
import AlbumListPanel from '@/feature/picsel/picselUpload/ui/organisms/AlbumListPanel';
import { PhotoGrid } from '@/feature/picsel/picselUpload/ui/organisms/PhotoGrid';
import { MainNavigationProps } from '@/navigation';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';

type SelectPhotoRouteProp =
  | RouteProp<MainNavigationProps, 'SelectMainPhoto'>
  | RouteProp<MainNavigationProps, 'SelectExtraPhoto'>
  | RouteProp<MainNavigationProps, 'SelectBookCover'>;

const SelectPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<SelectPhotoRouteProp>();
  const variant = route.params.variant;

  const { from, picselbookId } = route.params as {
    from?: 'edit';
    picselbookId?: string;
  };

  const { setMainPhoto, addExtraPhotos } = usePicselUploadStore();
  const { setMainPhoto: setEditMainPhoto, addExtraPhotos: addEditExtraPhotos } =
    usePhotoStore();

  const {
    albums,
    selectedAlbum,
    selectedGroupTypes,
    displayAlbumName,
    isAlbumListOpen,
    isReady,
    isPermissionDenied,
    toggleAlbumList,
    selectAlbum,
  } = useAlbumList();

  useEffect(() => {
    if (isPermissionDenied) {
      Alert.alert(
        PHOTO_PERMISSION_ALERT.TITLE,
        PHOTO_PERMISSION_ALERT.MESSAGE,
        [
          {
            text: PHOTO_PERMISSION_ALERT.CANCEL_TEXT,
            style: 'cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: PHOTO_PERMISSION_ALERT.CONFIRM_TEXT,
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  }, [isPermissionDenied, navigation]);

  const {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  } = usePhotoPicker(
    variant,
    selectedAlbum,
    selectedGroupTypes,
    from === 'edit',
  );

  const { setBookCoverPhoto } = usePhotoStore();

  const handleSelectedCompleted = () => {
    switch (variant) {
      case 'cover':
        setBookCoverPhoto(selectedUris[0]);
        navigation.goBack();

        return;
      case 'main':
        from === 'edit'
          ? setEditMainPhoto(selectedUris[0])
          : setMainPhoto(selectedUris[0]);
        break;
      case 'extra':
        from === 'edit'
          ? addEditExtraPhotos(selectedUris)
          : addExtraPhotos(selectedUris);
        break;
    }

    from === 'edit' ? navigation.goBack() : navigation.replace('PicselUpload');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <PhotoSelectHeader
        variant={variant}
        onReset={resetSelection}
        hasSelected={!picselbookId && !!selectedUris.length}
        albumName={displayAlbumName}
        isAlbumListOpen={isAlbumListOpen}
        onToggleAlbumList={toggleAlbumList}
        isEditCover={!!picselbookId}
      />

      <View style={{ flex: 1 }}>
        {isReady && (
          <PhotoGrid
            photos={photos}
            selectedUris={selectedUris}
            variant={variant}
            onSelectPhoto={handleSelectPhoto}
            onOpenCamera={handleOpenCamera}
            onLoadMore={fetchPhotos}
          />
        )}

        <AlbumListPanel
          albums={albums}
          selectedAlbum={selectedAlbum}
          isVisible={isAlbumListOpen}
          onSelectAlbum={selectAlbum}
        />
      </View>

      {selectedCount > 0 && (
        <SelectButton
          disabled={selectedCount === 0}
          actualSelectedCount={selectedCount}
          handleSelectedCompleted={handleSelectedCompleted}
        />
      )}
    </SafeAreaView>
  );
};

export default SelectPhotoScreen;
