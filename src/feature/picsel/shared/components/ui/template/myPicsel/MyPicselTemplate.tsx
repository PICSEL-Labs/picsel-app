import React, { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

import FloatingAddButton from '../../atoms/AddButton';
import EmptyStateLayout from '../../layouts/EmptyStateLayout';
import EmptyMessage from '../../molecule/EmptyMessage';
import UploadTooltip from '../../molecule/UploadTooltip';
import SelectionBottomSheet from '../../organisms/bottomSheet/SelectionBottomSheet';
import PixelToolbar from '../../organisms/PixelToolbar';

import PhotoListView, {
  MOCK_PHOTOS,
} from '@/feature/picsel/myPicsel/ui/organisms/PhotoListView';
import UpButton from '@/feature/picsel/shared/components/ui/atoms/UpButton';
import { usePicselBookActions } from '@/feature/picsel/shared/hooks/usePicselBookActions';
import { IMAGES } from '@/shared/constants/images';
import { showDeleteConfirmModal } from '@/shared/lib/confirmModal';
import { useToastStore } from '@/shared/store/ui/toast';

const MyPicselTemplate = () => {
  const { handleAddPicsel } = usePicselBookActions();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [showUpButton, setShowUpButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const selectionBottomSheetRef = useRef<BottomSheetModal>(null);
  const { showToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 -> 이후 query로 교체

  const totalPhotos = 19; // TODO: 실제 데이터로 교체
  const hasPhotos = totalPhotos > 0;

  // 선택 모드 변경 시 바텀시트 제어
  useEffect(() => {
    if (isSelecting) {
      selectionBottomSheetRef.current?.present();
    } else {
      selectionBottomSheetRef.current?.dismiss();
    }
  }, [isSelecting]);

  // 시뮬레이션: 데이터 로딩 (실제로는 API 호출)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPhotoData(MOCK_PHOTOS);
    }, 2000); // 2초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToTop = () => {
    setShowUpButton(false);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // 스크롤이 100px 이상 내려가면 버튼 표시
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
      // 전체 선택 상태면 전체 해제
      setSelectedPhotos([]);
    } else {
      // 전체 선택
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
    // TODO: 실제 삭제 로직
    showToast(`${selectedPhotos.length}장의 사진을 삭제했어요`, 60);
    setSelectedPhotos([]);
    setIsSelecting(false);
  };

  const handleMove = () => {
    // 다른 픽셀북 화면으로 이동
  };

  // const handleSort = () => {
  //   // TODO: 정렬 로직
  // };

  // Empty state (로딩 중이 아닐 때만 표시)
  if (!isLoading && !hasPhotos) {
    return (
      <EmptyStateLayout
        floatingButton={
          <>
            <UploadTooltip />
            <FloatingAddButton onPress={handleAddPicsel} />
          </>
        }>
        <EmptyMessage message="당신의 네컷사진을 올려보세요!" />
      </EmptyStateLayout>
    );
  }

  // Content state (로딩 중이거나 사진이 있을 때)
  return (
    <ImageBackground
      source={IMAGES.SPARKLE.BACKGROUND_OPACITY}
      resizeMode="contain"
      imageStyle={{ alignSelf: 'center' }}>
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
        // onSort={() => setShowSortSheet(true)}
        onFilter={() => {
          // TODO: 브랜드 필터 바텀시트
        }}
      />

      {/* 콘텐츠 - FlatList를 직접 사용 */}
      <PhotoListView
        ref={flatListRef}
        isSelecting={isSelecting}
        selectedPhotos={selectedPhotos}
        onToggleSelection={handleToggleSelection}
        isLoading={isLoading}
        onScroll={handleScroll}
      />

      {/* Floating Button */}
      {!isSelecting && (
        <View className="absolute bottom-[43px] right-4">
          {showUpButton && <UpButton onPress={handleScrollToTop} />}
          <FloatingAddButton onPress={handleAddPicsel} />
        </View>
      )}

      {/* Selection Bottom Sheet */}
      <SelectionBottomSheet
        ref={selectionBottomSheetRef}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </ImageBackground>
  );
};

export default MyPicselTemplate;
