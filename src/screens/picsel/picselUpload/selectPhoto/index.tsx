import React, { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectButton from '@/feature/brand/ui/organisms/SelectButton';
import { usePicselBook } from '@/feature/picsel/picselBook/hooks/usePicselBook';
import { useAlbumList } from '@/feature/picsel/picselUpload/hooks/useAlbumList';
import { usePhotoPicker } from '@/feature/picsel/picselUpload/hooks/usePhotoPicker';
import { usePicselUploadStore } from '@/feature/picsel/picselUpload/hooks/usePicselUploadStore';
import PhotoSelectHeader from '@/feature/picsel/picselUpload/ui/layout/PhotoSelectHeader';
import AlbumListPanel from '@/feature/picsel/picselUpload/ui/organisms/AlbumListPanel';
import { PhotoGrid } from '@/feature/picsel/picselUpload/ui/organisms/PhotoGrid';
import PicselBookBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/PicselBookBottomSheet';
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
  const picselBookRef = useRef<BottomSheetModal>(null);

  const { from, bookName: pendingBookName = '' } = route.params as {
    from?: 'edit';
    bookName?: string;
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
    toggleAlbumList,
    selectAlbum,
  } = useAlbumList();

  const {
    photos,
    selectedUris,
    selectedCount,
    fetchPhotos,
    handleSelectPhoto,
    handleOpenCamera,
    resetSelection,
  } = usePhotoPicker(variant, selectedAlbum, selectedGroupTypes);

  const { handleSubmit } = usePicselBook();

  const handleSelectedCompleted = () => {
    switch (variant) {
      case 'cover':
        picselBookRef.current?.present();
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
        hasSelected={!!selectedUris.length}
        albumName={displayAlbumName}
        isAlbumListOpen={isAlbumListOpen}
        onToggleAlbumList={toggleAlbumList}
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

      <PicselBookBottomSheet
        ref={picselBookRef}
        initialBookName={pendingBookName}
        onSubmit={handleSubmit}
      />

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
