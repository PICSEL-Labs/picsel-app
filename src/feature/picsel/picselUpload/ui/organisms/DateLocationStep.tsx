import React from 'react';

import { Text, View } from 'react-native';

import { usePicselUploadStore } from '../../hooks/usePicselUploadStore';

import Calendar from '@/assets/icons/calendar/icon-calendar.svg';
import UploadStepHeader from '@/feature/picsel/shared/components/ui/molecules/UploadStepHeader';
import LocationSearchBottomSheet from '@/feature/picsel/shared/components/ui/organisms/bottomSheet/LocationSearchBottomSheet';
import DatePickerBottomSheet from '@/feature/picsel/shared/components/ui/organisms/datePicker/DatePickerBottomSheet';
import { useDateLocationForm } from '@/feature/picsel/shared/hooks/datePicker/useDateLocationForm';
import MapIcons from '@/shared/icons/MapIcons';
import Button from '@/shared/ui/atoms/Button';
import InputButton from '@/shared/ui/atoms/InputButton';
import { formatDate } from '@/shared/utils/date';

interface Props {
  onNext: () => void;
}

const DateLocationStep = ({ onNext }: Props) => {
  const { takenDate, storeId, setDateLocation, locationName } =
    usePicselUploadStore();

  const { state, actions, datePicker } = useDateLocationForm({
    initialDate: takenDate,
    initialStoreId: storeId,
    initialLocation: locationName,
    onNext: (date, locationId, locName) => {
      setDateLocation(date, locationId, locName);
      onNext();
    },
  });

  return (
    <View className="flex-1">
      <UploadStepHeader
        title={
          <>
            찍은 <Text className="text-pink-500 title-02">날짜</Text>와{' '}
            <Text className="text-pink-500 title-02">위치</Text>를 선택해주세요
          </>
        }
        description="촬영 일자와 장소는 필수 입력 정보에요."
      />

      <View className="pt-6">
        <InputButton
          label="날짜"
          value={state.selectedDate ? formatDate(state.selectedDate) : ''}
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
      </View>

      <View className="absolute bottom-2 w-full items-center">
        <Button
          text="다음"
          color={state.isFilled ? 'active' : 'disabled'}
          textColor="white"
          onPress={actions.handleSubmit}
        />
      </View>

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
    </View>
  );
};

export default DateLocationStep;
