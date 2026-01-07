import { useActionSheetStore } from '@/shared/store/ui/actionSheet';

export type SortType = 'latest' | 'date' | 'name';

export interface SortOption {
  type: SortType;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { type: 'latest', label: '최신 순' },
  { type: 'date', label: '오래된 순' },
  { type: 'name', label: '가나다 순' },
];

interface UseSortActionSheetParams {
  onSort: (sortType: SortType) => void;
  options?: SortOption[];
  cancelText?: string;
}

/**
 * Picsel에서 사용하는 정렬 액션시트 훅
 * @param onSort 정렬 타입 선택 시 실행될 콜백
 * @param options 커스텀 정렬 옵션 (기본값: SORT_OPTIONS)
 * @param cancelText 취소 버튼 텍스트 (기본값: '취소')
 */
export const useSortActionSheet = ({
  onSort,
  options = SORT_OPTIONS,
  cancelText = '취소',
}: UseSortActionSheetParams) => {
  const showSortSheet = () => {
    const actionSheetOptions = options.map(opt => ({
      label: opt.label,
      onPress: () => onSort(opt.type),
    }));

    useActionSheetStore.getState().showActionSheet({
      options: actionSheetOptions,
      cancelText,
    });
  };

  return { showSortSheet };
};
