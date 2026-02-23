import React, { useCallback } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PicselDetailHeader from '@/feature/picsel/myPicsel/components/ui/molecules/PicselDetailHeader';
import { useImageViewer } from '@/feature/picsel/myPicsel/hooks/useImageViewer';
import { usePhotoViewerMenu } from '@/feature/picsel/myPicsel/hooks/usePhotoViewerMenu';
import { usePicselDetailMenu } from '@/feature/picsel/myPicsel/hooks/usePicselDetailMenu';
import { useGetPicselDetail } from '@/feature/picsel/myPicsel/queries/useGetPicselDetail';
import { usePhotoFormat } from '@/feature/picsel/shared/utils/usePhotoFormat';
import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import AspectRatioImage from '@/shared/components/ui/atoms/AspectRatioImage';
import DropdownMenu from '@/shared/components/ui/molecules/DropdownMenu';
import { useDropdownMenu } from '@/shared/hooks/useDropdownMenu';
import SparkleImages from '@/shared/images/Sparkle';

const DUMMY_PICSEL = {
  takenDate: '2024-05-20',
  title: '오늘의 즐거운 기록',
  store: { storeName: '픽셀 스튜디오 강남점' },
  representativeImagePath:
    'https://images.unsplash.com/photo-1740498276422-e9df92e4a369?q=80&w=987&auto=format&fit=crop',
  photos: [
    {
      imagePath:
        'https://images.unsplash.com/photo-1740498276422-e9df92e4a369?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      imagePath:
        'https://images.unsplash.com/photo-1762112800032-b8d8119557b8?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
  content:
    '오랜만에 친구랑 만나서 수다 떨면서 돌아다녔다. 평소처럼 놀다가 갑자기 눈이 오기 시작해서 괜히 더 기분이 좋아졌다',
};

type Props = NativeStackScreenProps<MainNavigationProps, 'PicselDetail'>;

const PicselDetailScreen = ({ route, navigation }: Props) => {
  const { picselId } = route.params;
  const { formatDate } = usePhotoFormat();
  const insets = useSafeAreaInsets();

  const { data: picsel } = useGetPicselDetail(picselId);
  const picselData = picsel || DUMMY_PICSEL;

  const postDropdown = useDropdownMenu();
  const { dropdownItems: postDropdownItems } = usePicselDetailMenu({
    picselId,
    hideDropdown: postDropdown.hide,
  });

  const viewerDropdown = useDropdownMenu();

  const viewer = useImageViewer();

  const { dropdownItems: viewerDropdownItems } = usePhotoViewerMenu({
    picselId,
    imagePath: viewer.uri,
    hideDropdown: viewerDropdown.hide,
  });

  const closeViewer = () => {
    viewerDropdown.hide();
    viewer.close();
  };

  const renderViewerHeader = useCallback(
    () => (
      <View style={{ paddingTop: insets.top }}>
        <PicselDetailHeader
          onBackPress={closeViewer}
          rightIconPress={viewerDropdown.toggle}
        />
        {viewerDropdown.isMounted && (
          <DropdownMenu
            isMounted={viewerDropdown.isMounted}
            animatedStyle={viewerDropdown.animatedStyle}
            items={viewerDropdownItems}
            onClose={() => viewerDropdown.hide()}
          />
        )}
      </View>
    ),
    [
      insets.top,
      viewerDropdown.isMounted,
      viewerDropdown.animatedStyle,
      viewerDropdownItems,
    ],
  );

  return (
    <ScreenLayout>
      <PicselDetailHeader
        onBackPress={() => navigation.goBack()}
        rightIconPress={postDropdown.toggle}
      />
      <ScrollView>
        {/* 픽셀 정보 */}
        <View className="items-center">
          <Text className="px-4 text-gray-900 headline-01">
            {formatDate(picselData.takenDate)}
          </Text>
          <Text className="px-4 py-1 text-gray-900 title-02">
            {picselData.title}
          </Text>

          <View className="flex-row items-center gap-1 py-2">
            <SparkleImages shape="icon-one" height={24} width={24} />
            <Text className="text-gray-900 body-rg-03">
              {picselData.store.storeName}
            </Text>
          </View>
        </View>
        {/* 대표 사진 */}
        <View className="mb-6 px-4">
          <Pressable
            onPress={() => viewer.open(picselData.representativeImagePath)}>
            <AspectRatioImage
              uri={picselData.representativeImagePath}
              style={{ width: '100%' }}
            />
          </Pressable>
        </View>

        {/* 본문 내용 */}
        <View className="px-6 pb-6 pt-2">
          <Text className="text-gray-900 body-rg-02">{picselData.content}</Text>
        </View>

        {/* 추가 사진 */}
        <View className="justify-between px-4">
          {picselData.photos.map((photo, index) => (
            <Pressable key={index} onPress={() => viewer.open(photo.imagePath)}>
              <AspectRatioImage
                uri={photo.imagePath}
                style={{ width: '100%' }}
                className="mb-4"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <DropdownMenu
        isMounted={postDropdown.isMounted}
        animatedStyle={postDropdown.animatedStyle}
        items={postDropdownItems}
        onClose={() => postDropdown.hide()}
      />
      <ImageView
        images={viewer.images}
        imageIndex={0}
        visible={viewer.visible}
        onRequestClose={closeViewer}
        backgroundColor="#FFFFFF"
        HeaderComponent={renderViewerHeader}
        doubleTapToZoomEnabled
      />
    </ScreenLayout>
  );
};

export default PicselDetailScreen;
