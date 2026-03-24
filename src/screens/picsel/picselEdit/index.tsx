import React, { useRef } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Calendar from '@/assets/icons/calendar/icon-calendar.svg';
import PicselbookSection from '@/feature/picsel/myPicsel/components/ui/organisms/PicselbookSection';
import { usePicselEdit } from '@/feature/picsel/myPicsel/hooks/usePicselEdit';
import LocationSearchBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/LocationSearchBottomSheet';
import ContentInput from '@/feature/picsel/shared/components/ui/organisms/ContentInput';
import DatePickerBottomSheet from '@/feature/picsel/shared/components/ui/organisms/datePicker/DatePickerBottomSheet';
import PhotoEditSection from '@/feature/picsel/shared/components/ui/organisms/PhotoEditSection';
import { MainNavigationProps } from '@/navigation';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import CloseIcons from '@/shared/icons/CloseIcons';
import MapIcons from '@/shared/icons/MapIcons';
import PicselActionIcons from '@/shared/icons/PicselActionIcons';
import Button from '@/shared/ui/atoms/Button';
import InputButton from '@/shared/ui/atoms/InputButton';
import { formatDate } from '@/shared/utils/date';

type Props = NativeStackScreenProps<MainNavigationProps, 'PicselEdit'>;

const PicselEditScreen = ({ route, navigation }: Props) => {
  const { picselId } = route.params;

  const {
    picselData,
    mainPhoto,
    extraPhotos,
    setMainPhoto,
    removeExtraPhoto,
    title,
    content,
    setTitle,
    setContent,
    state,
    actions,
    datePicker,
    isFilled,
    handleSelectMainPhoto,
    handleAddExtraPhoto,
    handleDelete,
    handleClose,
  } = usePicselEdit({ picselId, navigation });

  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScreenLayout>
      <View className="relative mb-2 flex-row items-center justify-center">
        <Pressable className="absolute left-4" onPress={handleDelete}>
          <PicselActionIcons
            shape="delete"
            width={24}
            height={24}
            color="#26272C"
          />
        </Pressable>
        <Text className="text-gray-900 title-01">편집</Text>
        <Pressable className="absolute right-4" onPress={handleClose}>
          <CloseIcons height={24} width={24} shape="black" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 48 }}>
          <PhotoEditSection
            mainPhoto={mainPhoto}
            extraPhotos={extraPhotos}
            onDeleteMainPhoto={() => setMainPhoto(null)}
            onSelectMainPhoto={handleSelectMainPhoto}
            onAddExtraPhoto={handleAddExtraPhoto}
            onRemoveExtraPhoto={removeExtraPhoto}
            variant="edit"
          />

          <InputButton
            label="날짜"
            value={formatDate(state.selectedDate)}
            placeholder="언제 찍었나요?"
            Icon={<Calendar width={24} height={24} />}
            onPress={actions.openDatePicker}
          />

          <InputButton
            label="위치"
            value={state.selectedLocation}
            placeholder="어디서 찍었나요?"
            Icon={<MapIcons shape="border-black" width={24} height={24} />}
            onPress={actions.openLocationSearch}
          />

          <PicselbookSection
            picselbook={picselData?.picselbook}
            onMovePress={() =>
              navigation.navigate('PicselMove', {
                picselId,
                currentPicselbookId: picselData?.picselbook.picselbookId ?? '',
              })
            }
          />

          <ContentInput
            title={title}
            content={content}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
            onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
          />
        </ScrollView>

        <View className="items-center px-4">
          <Button
            text="편집 완료"
            color={isFilled ? 'active' : 'disabled'}
            textColor="white"
            disabled={!isFilled}
            className="w-full"
            onPress={actions.handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>

      <DatePickerBottomSheet
        visible={state.isDatePickerVisible}
        onClose={actions.closeSheet}
        picker={datePicker}
        onConfirm={actions.handleConfirmDate}
      />

      <LocationSearchBottomSheet
        visible={state.isLocationVisible}
        onClose={actions.closeSheet}
        onSelect={actions.handleSelectLocation}
      />
    </ScreenLayout>
  );
};

export default PicselEditScreen;
