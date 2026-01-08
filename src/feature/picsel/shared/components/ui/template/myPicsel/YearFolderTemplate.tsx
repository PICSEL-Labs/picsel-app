import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';

import FunctionButton from '../../atoms/FunctionButton';

import PhotoListView, {
  MOCK_PHOTOS,
} from '@/feature/picsel/myPicsel/ui/organisms/PhotoListView';
import FloatingAddButton from '@/feature/picsel/shared/components/ui/atoms/AddButton';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/UpButton';
import SelectionBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '@/feature/picsel/shared/components/ui/organisms/PixelToolbar';
import {
  SortType,
  useSortActionSheet,
} from '@/feature/picsel/shared/hooks/useSortActionSheet';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { showBrandFilterSheet } from '@/shared/lib/brandFilterSheet';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

interface Props {
  year: string;
  onBack: () => void;
}

const YearFolderTemplate = ({ year, onBack }: Props) => {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [showUpButton, setShowUpButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const selectionBottomSheetRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastStore();
  const [showFunctionButtons, setShowFunctionButtons] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const totalPhotos = 19; // TODO: 실제 데이터로 교체

  // 선택 모드 변경 시 바텀시트 제어
  useEffect(() => {
    if (isSelecting) {
      selectionBottomSheetRef.current?.present();
    } else {
      selectionBottomSheetRef.current?.dismiss();
    }
  }, [isSelecting]);

  // 데이터 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPhotoData(MOCK_PHOTOS);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToTop = () => {
    setShowUpButton(false);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowUpButton(offsetY > 100);
  };

  const handleToggleSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === totalPhotos) {
      setSelectedPhotos([]);
    } else {
      const allPhotoIds = photoData.map(photo => photo.id);
      setSelectedPhotos(allPhotoIds);
    }
  };

  const handleDelete = () => {
    if (selectedPhotos.length === 0) {
      showToast('삭제할 픽셀북을 선택해주세요', 60);
      return;
    }

    showDeleteConfirmModal(selectedPhotos.length, handleConfirmDelete);
  };

  const handleConfirmDelete = () => {
    showToast(`${selectedPhotos.length}장의 사진을 삭제했어요`, 60);
    setSelectedPhotos([]);
    setIsSelecting(false);
  };

  const handleMove = () => {
    // 다른 픽셀북 화면으로 이동
  };

  const handleSort = (sortType: SortType) => {
    console.log('정렬 타입:', sortType);
    // TODO: 정렬 로직 구현
  };

  const { showSortSheet } = useSortActionSheet({
    onSort: handleSort,
  });

  const handleToggleFunctionButtons = () => {
    setShowFunctionButtons(!showFunctionButtons);
  };

  const handleAlbumPress = () => {
    console.log('앨범에서 선택');
    // TODO: 앨범에서 사진 선택 로직
    setShowFunctionButtons(false);
  };

  const handleQrPress = () => {
    console.log('QR 스캔');
    // TODO: QR 스캔 로직
    setShowFunctionButtons(false);
  };

  const handleCloseFunctionButtons = () => {
    setShowFunctionButtons(false);
  };

  return (
    <ScreenLayout>
      {/* 헤더 */}
      <View className="flex-row items-center bg-white px-6 pt-4">
        <Pressable onPress={onBack}>
          <ArrowIcons shape="back" width={24} height={24} />
        </Pressable>
        <Text className="flex-1 text-center text-gray-900 headline-03">
          {year}년
        </Text>
        <View className="w-6" />
      </View>

      {/* 툴바 */}
      <PixelToolbar
        totalPhotos={totalPhotos}
        isSelecting={isSelecting}
        selectedCount={selectedPhotos.length}
        onToggleSelecting={() => setIsSelecting(!isSelecting)}
        onSelectAll={handleSelectAll}
        onClose={() => {
          setIsSelecting(false);
          setSelectedPhotos([]);
        }}
        onSort={showSortSheet}
        onFilter={showBrandFilterSheet}
      />

      {/* 콘텐츠 */}
      <PhotoListView
        ref={flatListRef}
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        onToggleSelection={handleToggleSelection}
        isLoading={isLoading}
        onScroll={handleScroll}
      />

      {/* Selection Bottom Sheet */}
      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      {/* Floating Buttons - 항상 하단 고정 */}
      {!isSelecting && (
        <>
          {/* Add Button - Right */}
          <View className="absolute bottom-11 right-4">
            {showUpButton && (
              <View
                style={{
                  marginBottom: showFunctionButtons ? 60 : 56,
                }}>
                <UpButton onPress={handleScrollToTop} />
              </View>
            )}
            {showFunctionButtons ? (
              <FunctionButton
                onAlbumPress={handleAlbumPress}
                onQrPress={handleQrPress}
                onClose={handleCloseFunctionButtons}
              />
            ) : (
              <FloatingAddButton onPress={handleToggleFunctionButtons} />
            )}
          </View>
        </>
      )}
    </ScreenLayout>
  );
};

export default YearFolderTemplate;
