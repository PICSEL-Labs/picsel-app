import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

import { useDatePickerController } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';

interface Props {
  initialDate?: string;
  initialLocation?: string;
  onNext: (date: string, location: string) => void;
}

export const useDateLocationForm = ({
  initialDate,
  initialLocation,
  onNext,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const [activeSheet, setActiveSheet] = useState<'date' | 'location' | null>(
    null,
  );

  const datePicker = useDatePickerController();

  const openDatePicker = () => setActiveSheet('date');
  const openLocationSearch = () => setActiveSheet('location');
  const closeSheet = () => setActiveSheet(null);

  const handleConfirmDate = useCallback(() => {
    const date = datePicker.confirm();
    if (date) {
      setSelectedDate(dayjs(date).format('YYYY년 MM월 DD일'));
    }
    closeSheet();
  }, [datePicker]);

  const handleSelectLocation = useCallback((locationName: string) => {
    setSelectedLocation(locationName);
    closeSheet();
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedDate && selectedLocation) {
      onNext(selectedDate, selectedLocation);
    }
  }, [selectedDate, selectedLocation, onNext]);

  const isFilled = selectedDate.length > 0 && selectedLocation.length > 0;

  return {
    state: {
      selectedDate,
      selectedLocation,
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
