import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

import { useDatePickerController } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';

interface Props {
  initialDate?: string;
  initialStoreId?: string;
  initialLocation?: string;
  onNext: (date: string, storeId: string, locationName: string) => void;
}

export const useDateLocationForm = ({
  initialDate,
  initialStoreId,
  initialLocation,
  onNext,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedLocationName, setSelectedLocationName] =
    useState(initialLocation);
  const [selectedStoreId, setSelectedStoreId] = useState(initialStoreId || '');

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
    (id: string, name: string) => {
      setSelectedStoreId(id);
      setSelectedLocationName(name);
      closeSheet();
    },
    [closeSheet],
  );

  const handleSubmit = useCallback(() => {
    if (selectedDate && selectedStoreId) {
      onNext(selectedDate, selectedStoreId, selectedLocationName);
    }
  }, [selectedDate, selectedStoreId, selectedLocationName, onNext]);

  const isFilled = !!(selectedDate && selectedStoreId);

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
