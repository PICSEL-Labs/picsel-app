import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PicselDetailHeader from '@/feature/picsel/myPicsel/components/ui/molecules/PicselDetailHeader';
import { useImageViewer } from '@/feature/picsel/myPicsel/hooks/useImageViewer';
import { usePhotoViewerMenu } from '@/feature/picsel/myPicsel/hooks/usePhotoViewerMenu';
import { usePicselDetailMenu } from '@/feature/picsel/myPicsel/hooks/usePicselDetailMenu';
import { useViewerHeader } from '@/feature/picsel/myPicsel/hooks/useViewerHeader';
import { useGetPicselDetail } from '@/feature/picsel/myPicsel/queries/useGetPicselDetail';
import { usePhotoFormat } from '@/feature/picsel/shared/utils/usePhotoFormat';
import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import AspectRatioImage from '@/shared/components/ui/atoms/AspectRatioImage';
import DropdownMenu from '@/shared/components/ui/molecules/DropdownMenu';
import { useDropdownMenu } from '@/shared/hooks/useDropdownMenu';
import SparkleImages from '@/shared/images/Sparkle';
import { useToastStore } from '@/shared/store/ui/toast';
import { getImageUrl } from '@/shared/utils/image';

type Props = NativeStackScreenProps<MainNavigationProps, 'PicselDetail'>;

const PicselDetailScreen = ({ route, navigation }: Props) => {
  const { picselId } = route.params;
  const { formatDate } = usePhotoFormat();
  const insets = useSafeAreaInsets();

  const { data: picselData } = useGetPicselDetail(picselId);

  const postDropdown = useDropdownMenu();
  const { dropdownItems: postDropdownItems } = usePicselDetailMenu({
    picselId,
    currentPicselbookId: picselData?.picselbook.picselbookId ?? '',
    hideDropdown: postDropdown.hide,
  });

  const viewerDropdown = useDropdownMenu();

  const viewer = useImageViewer();

  const { dropdownItems: viewerDropdownItems } = usePhotoViewerMenu({
    uri: viewer.uri,
    hideDropdown: viewerDropdown.hide,
  });

  const extraPhotos = picselData?.photos.slice(1) ?? [];

  const { hideToast } = useToastStore();

  const closeViewer = () => {
    viewerDropdown.hide();
    viewer.close();
    hideToast();
  };

  const { renderHeader: renderViewerHeader } = useViewerHeader({
    insets,
    dropdown: viewerDropdown,
    dropdownItems: viewerDropdownItems,
    onClose: closeViewer,
  });

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
  };

  return (
    <ScreenLayout>
      <PicselDetailHeader
        onBackPress={handleBack}
        rightIconPress={postDropdown.toggle}
      />
      <ScrollView>
        <View className="items-center">
          <Text className="px-4 text-gray-900 headline-01">
            {formatDate(picselData?.takenDate)}
          </Text>
          <Text className="px-4 py-1 text-gray-900 title-02">
            {picselData?.title}
          </Text>

          <View className="flex-row items-center gap-1 py-2">
            <SparkleImages shape="icon-one" height={24} width={24} />
            <Text className="text-gray-900 body-rg-03">
              {picselData?.store.storeName}
            </Text>
          </View>
        </View>
        {picselData?.representativeImagePath && (
          <View className="mb-6 px-4">
            <Pressable
              onPress={() =>
                viewer.open(getImageUrl(picselData.representativeImagePath))
              }>
              <AspectRatioImage
                uri={getImageUrl(picselData.representativeImagePath)}
                style={{ width: '100%' }}
              />
            </Pressable>
          </View>
        )}
        <View className="px-6 pb-6 pt-2">
          <Text className="text-gray-900 body-rg-02">
            {picselData?.content}
          </Text>
        </View>
        <View className="justify-between px-4">
          {extraPhotos.length > 0 && (
            <View className="justify-between px-4">
              {extraPhotos.map(photo => (
                <Pressable
                  key={photo.imagePath}
                  onPress={() => viewer.open(getImageUrl(photo.imagePath))}>
                  <AspectRatioImage
                    uri={getImageUrl(photo.imagePath)}
                    style={{ width: '100%' }}
                    className="mb-4"
                  />
                </Pressable>
              ))}
            </View>
          )}
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
