import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface UseSelectingModeOptions {
  isSelecting: boolean;
  setIsSelecting: (value: boolean) => void;
  resetSelection: () => void;
  /**
   * 선택 모드 전환 딜레이 (ms)
   * @default 500
   */
  delay?: number;
}

interface UseSelectingModeReturn {
  isSelectingChanging: boolean;
  handleEnterSelecting: () => void;
  handleExitSelecting: () => void;
  selectionSheetRef: React.RefObject<BottomSheetModal>;
}

export const useSelectingMode = ({
  isSelecting,
  setIsSelecting,
  resetSelection,
  delay = 500,
}: UseSelectingModeOptions): UseSelectingModeReturn => {
  const selectionSheetRef = useRef<BottomSheetModal>(null);
  const [isSelectingChanging, setIsSelectingChanging] = useState(false);

  const handleEnterSelecting = () => {
    if (isSelecting || isSelectingChanging) {
      return;
    }

    setIsSelectingChanging(true);
    setIsSelecting(true);

    // 바텀시트 자동 표시
    setTimeout(() => {
      selectionSheetRef.current?.present();
    }, 100);

    // 딜레이 후 다시 클릭 가능하도록
    setTimeout(() => {
      setIsSelectingChanging(false);
    }, delay);
  };

  const handleExitSelecting = () => {
    if (!isSelecting || isSelectingChanging) {
      return;
    }

    setIsSelectingChanging(true);
    selectionSheetRef.current?.dismiss();
    resetSelection();

    // 딜레이 후 다시 클릭 가능하도록
    setTimeout(() => {
      setIsSelectingChanging(false);
    }, delay);
  };

  return {
    isSelectingChanging,
    handleEnterSelecting,
    handleExitSelecting,
    selectionSheetRef,
  };
};
