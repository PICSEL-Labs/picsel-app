import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

export type PickerMode = 'day' | 'month' | 'year';

export const useDatePickerController = () => {
  // 현재 표시 모드 (일/월/연 단위 선택)
  const [mode, setMode] = useState<PickerMode>('day');

  // 달력에서 보고 있는 기준 날짜
  const [current, setCurrent] = useState(dayjs());

  // 실제로 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  // 선택된 날짜를 확정하고 반환
  const confirm = useCallback(() => {
    if (!selectedDate || !dayjs.isDayjs(selectedDate)) {
      return null;
    }
    return selectedDate;
  }, [selectedDate]);

  return {
    mode,
    current,
    selectedDate,
    setMode,
    setCurrent,
    setSelectedDate,
    confirm,
  };
};
