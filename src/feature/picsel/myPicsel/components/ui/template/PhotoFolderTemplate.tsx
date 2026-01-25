import React, { ReactNode } from 'react';

import PhotoListView from '@/feature/picsel/myPicsel/components/ui/organisms/PhotoListView';
import { Photo } from '@/feature/picsel/picselBook/data/mockPicselBookPhotoData';
import FloatingActionButtons from '@/feature/picsel/shared/components/ui/molecules/Button/FloatingActionButtons';
import FolderHeader from '@/feature/picsel/shared/components/ui/molecules/FolderHeader';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

interface PhotoFolderTemplateProps {
  title: string;
  onBack: () => void;
  photoData: Photo[];
  isLoading: boolean;
  totalPhotos: number;
  isSelecting: boolean;
  selectedPhotos: string[];
  toggleSelection: (photoId: string) => void;
  onSelectAll: () => void;
  handleEnterSelecting: () => void;
  handleExitSelecting: () => void;
  selectionBottomSheetRef: React.RefObject<any>;
  showUpButton: boolean;
  flatListRef: React.RefObject<any>;
  handleScroll: (event: any) => void;
  scrollToTop: () => void;
  showFunctionButtons: boolean;
  toggleFunctionButtons: () => void;
  handleAlbumPress: () => void;
  handleQrPress: () => void;
  closeFunctionButtons: () => void;
  handleDelete: () => void;
  handleMove: () => void;
  onSort: () => void;
  onFilter: () => void;
  showYear?: boolean;
  children?: ReactNode;
}

const PhotoFolderTemplate = ({
  title,
  onBack,
  photoData,
  isLoading,
  totalPhotos,
  isSelecting,
  selectedPhotos,
  toggleSelection,
  onSelectAll,
  handleEnterSelecting,
  handleExitSelecting,
  selectionBottomSheetRef,
  showUpButton,
  flatListRef,
  handleScroll,
  scrollToTop,
  showFunctionButtons,
  toggleFunctionButtons,
  handleAlbumPress,
  handleQrPress,
  closeFunctionButtons,
  handleDelete,
  handleMove,
  onSort,
  onFilter,
  showYear,
  children,
}: PhotoFolderTemplateProps) => {
  console.log('[PhotoFolderTemplate] 렌더링:', {
    isLoading,
    photoDataLength: photoData.length,
    totalPhotos,
  });

  return (
    <ScreenLayout>
      <FolderHeader title={title} onBack={onBack} />

      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        onToggleSelecting={handleEnterSelecting}
        onSelectAll={onSelectAll}
        onClose={handleExitSelecting}
        onSort={onSort}
        onFilter={onFilter}
      />

      {children}

      <PhotoListView
        ref={flatListRef}
        data={photoData}
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        onToggleSelection={toggleSelection}
        isLoading={isLoading}
        onScroll={handleScroll}
        showYear={showYear}
      />

      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      <FloatingActionButtons
        isSelecting={isSelecting}
        showUpButton={showUpButton}
        showFunctionButtons={showFunctionButtons}
        onScrollToTop={scrollToTop}
        onToggleFunctionButtons={toggleFunctionButtons}
        onAlbumPress={handleAlbumPress}
        onQrPress={handleQrPress}
        onCloseFunctionButtons={closeFunctionButtons}
      />
    </ScreenLayout>
  );
};

export default PhotoFolderTemplate;
