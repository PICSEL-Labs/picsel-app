import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import PicselUploadLayout from '@/feature/picsel/picselUpload/ui/layout/PicselUploadLayout';
import ExtraPhotoList from '@/feature/picsel/picselUpload/ui/organisms/ExtraPhotoList';
import MainPhotoCard from '@/feature/picsel/picselUpload/ui/organisms/MainPhotoCard';
import { RootStackNavigationProp } from '@/navigation/types/navigateTypeUtil';
import { usePhotoStore } from '@/shared/store/picselUpload';
import Button from '@/shared/ui/atoms/Button';
import ProgressBar from '@/shared/ui/molecules/ProgressBar';

const RegisterPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { mainPhoto, extraPhotos, setMainPhoto, removeExtraPhoto } =
    usePhotoStore();

  return (
    <PicselUploadLayout>
      <ProgressBar currentStep={1} totalStep={4} />
      <View className="flex-1">
        <View className="gap-2 px-5 pb-3 pt-5">
          <Text className="text-gray-900 headline-04">
            저장할 <Text className="text-pink-500 title-02">사진</Text>을
            등록해주세요
          </Text>
          <Text className="text-gray-600 body-rg-02">
            네컷 사진과 함께 추억이 담긴 {'\n'}다른 사진도 추가해 저장할 수
            있어요.
          </Text>
        </View>
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
            onPress={() => {}} // TODO: 다음 단계로 이동하는 핸들러 추가
          />
        </View>
      </View>
    </PicselUploadLayout>
  );
};

export default RegisterPhotoScreen;
