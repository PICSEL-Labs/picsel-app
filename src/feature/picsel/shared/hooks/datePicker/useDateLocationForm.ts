import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

import { useDatePickerController } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';
import { PlaceType } from '@/feature/picsel/shared/types';

interface Props {
  initialDate?: string;
  initialPlaceId?: string;
  initialPlaceType?: PlaceType;
  initialLocation?: string;
  onNext: (
    date: string,
    placeId: string,
    placeType: PlaceType,
    locationName: string,
  ) => void;
}

export const useDateLocationForm = ({
  initialDate,
  initialPlaceId,
  initialPlaceType,
  initialLocation,
  onNext,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedLocationName, setSelectedLocationName] =
    useState(initialLocation);
  const [selectedPlaceId, setSelectedPlaceId] = useState(initialPlaceId || '');
  const [selectedPlaceType, setSelectedPlaceType] = useState<
    PlaceType | undefined
  >(initialPlaceType);

  const [activeSheet, setActiveSheet] = useState<'date' | 'location' | null>(
    null,
  );

  const datePicker = useDatePickerController();

  const openDatePicker = () => setActiveSheet('date');
  const openLocationSearch = () => setActiveSheet('location');
  const closeSheet = useCallback(() => setActiveSheet(null), []);

  const handleConfirmDate = useCallback(() => {
    const date = datePicker.confirm();
    if (date) {
      setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
    }
    closeSheet();
  }, [datePicker]);

  const handleSelectLocation = useCallback(
    (id: string, name: string, placeType: PlaceType) => {
      setSelectedPlaceId(id);
      setSelectedLocationName(name);
      setSelectedPlaceType(placeType);
      closeSheet();
    },
    [closeSheet],
  );

  const handleSubmit = useCallback(() => {
    if (selectedDate && selectedPlaceId && selectedPlaceType) {
      onNext(
        selectedDate,
        selectedPlaceId,
        selectedPlaceType,
        selectedLocationName,
      );
    }
  }, [
    selectedDate,
    selectedPlaceId,
    selectedPlaceType,
    selectedLocationName,
    onNext,
  ]);

  const isFilled = !!(selectedDate && selectedPlaceId && selectedPlaceType);

  return {
    state: {
      selectedDate,
      selectedLocation: selectedLocationName,
      isDatePickerVisible: activeSheet === 'date',
      isLocationVisible: activeSheet === 'location',
      isFilled,
    },
    actions: {
      openDatePicker,
      openLocationSearch,
      closeSheet,
      handleConfirmDate,
      handleSelectLocation,
      handleSubmit,
    },
    datePicker,
  };
};
