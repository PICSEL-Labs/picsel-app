import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import ExtraPhotoList from '@/feature/picsel/picselUpload/ui/organisms/ExtraPhotoList';
import MainPhotoCard from '@/feature/picsel/picselUpload/ui/organisms/MainPhotoCard';
import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';
import Button from '@/shared/ui/atoms/Button';

interface Props {
  onNext: () => void;
}
const PhotoSelectStep = ({ onNext }: Props) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { mainPhoto, extraPhotos, setMainPhoto, removeExtraPhoto } =
    usePhotoStore();

  return (
    <>
      <View className="flex-1">
        <UploadStepHeader
          title={
            <>
              저장할 <Text className="text-pink-500 title-02">사진</Text>을
              등록해주세요
            </>
          }
          description={
            <>
              네컷 사진과 함께 추억이 담긴{'\n'}
              다른 사진도 추가해 저장할 수 있어요.
            </>
          }
        />
        <MainPhotoCard
          uri={mainPhoto}
          onDelete={() => setMainPhoto(null)}
          onSelect={() => {
            navigation.navigate('SelectMainPhoto');
          }}
        />
        <ExtraPhotoList
          photos={extraPhotos}
          onAdd={() => navigation.navigate('SelectExtraPhoto')}
          onRemove={removeExtraPhoto}
        />
        <View className="absolute bottom-2 w-full items-center">
          <Button
            text="다음"
            color={`${mainPhoto ? 'active' : 'disabled'}`}
            textColor="white"
            disabled={!mainPhoto}
            onPress={onNext}
          />
        </View>
      </View>
    </>
  );
};

export default PhotoSelectStep;
