import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

import PhotoRegisterHeader from '@/feature/picselUpload/ui/layout/photoRegisterHeader';
import ExtraPhotoList from '@/feature/picselUpload/ui/organisms/ExtraPhotoList';
import MainPhotoCard from '@/feature/picselUpload/ui/organisms/MainPhotoCard';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import { useModal } from '@/shared/hooks/useModal';
import { usePhotoStore } from '@/shared/store/picselUpload';
import { RootStackNavigationProp } from '@/shared/types/navigateTypeUtil';
import Button from '@/shared/ui/atoms/Button';
import ProgressBar from '@/shared/ui/molecules/ProgressBar';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const RegisterPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { mainPhoto, extraPhotos, setMainPhoto, removeExtraPhoto } =
    usePhotoStore();

  const { isModalOpen, closeModal, openModal } = useModal();
  const { reset } = usePhotoStore();

  return (
    <ScreenLayout>
      <PhotoRegisterHeader
        onBack={() => navigation.goBack()}
        onClose={openModal}
      />
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
            navigation.navigate('SelectPhoto', {
              variant: 'main',
            });
          }}
        />
        <ExtraPhotoList
          photos={extraPhotos}
          onAdd={() => navigation.navigate('SelectPhoto', { variant: 'extra' })}
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
      <ConfirmModal
        visible={isModalOpen}
        title="업로드를 종료할까요?"
        description={'지금까지 입력한 정보가\n모두 지워져요'}
        cancelText="계속하기"
        confirmText="종료"
        onCancel={closeModal}
        onConfirm={() => {
          reset();
          closeModal();
          navigation.replace('QrScan');
        }}
      />
    </ScreenLayout>
  );
};

export default RegisterPhotoScreen;
