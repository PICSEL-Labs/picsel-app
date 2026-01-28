import React from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DatePickerActionButton from './DatePickerActionButton';
import DatePickerDayView from './DatePickerDayView';
import DatePickerHeader from './DatePickerHeader';
import DatePickerMonthView from './DatePickerMonthView';
import DatePickerYearView from './DatePickerYearView';

import { useDatePickerController } from '@/feature/picsel/picselUpload/hooks/useDatePickerController';
import { useDatePickerBottomSheet } from '@/feature/picsel/shared/hooks/bottomSheet/useDatePickerBottomSheet';
import { bottomSheetIndicator } from '@/shared/styles/bottomSheetIndicator';
import { bottomSheetShadow } from '@/shared/styles/shadows';

interface Props {
  visible: boolean;
  onClose: () => void;
  picker: ReturnType<typeof useDatePickerController>;
  onConfirm: () => void;
}

const DatePickerBottomSheet = ({
  visible,
  onClose,
  picker,
  onConfirm,
}: Props) => {
  const insets = useSafeAreaInsets();
  const { bottomSheetRef } = useDatePickerBottomSheet({
    visible,
  });

  const handleConfirm = () => {
    if (picker.mode === 'month' || picker.mode === 'year') {
      picker.setMode('day');
      return;
    }

    if (picker.selectedDate) {
      onConfirm();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={onClose}
      enableDynamicSizing
      enablePanDownToClose
      enableOverDrag={false}
      handleIndicatorStyle={bottomSheetIndicator}
      style={bottomSheetShadow}
      backgroundStyle={{ borderRadius: 24 }}>
      <BottomSheetView style={{ paddingBottom: insets.bottom }}>
        <DatePickerHeader
          mode={picker.mode}
          current={picker.current}
          onChangeMode={picker.setMode}
          onChangeCurrent={picker.setCurrent}
          onConfirm={handleConfirm}
        />
        {picker.mode === 'day' && (
          <DatePickerDayView
            current={picker.current}
            selectedDate={picker.selectedDate}
            onSelect={picker.setSelectedDate}
          />
        )}
        {picker.mode === 'month' && (
          <DatePickerMonthView
            current={picker.current}
            onChange={picker.setCurrent}
          />
        )}
        {picker.mode === 'year' && (
          <DatePickerYearView
            current={picker.current}
            onChange={picker.setCurrent}
          />
        )}
        <DatePickerActionButton mode={picker.mode} onConfirm={handleConfirm} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default DatePickerBottomSheet;
