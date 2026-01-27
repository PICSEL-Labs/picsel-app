import { MyPicselSortType } from '@/feature/picsel/myPicsel/types';
import { useActionSheetStore } from '@/shared/store/ui/actionSheet';

export type PicselBookSortType = 'latest' | 'add' | 'length';

export interface SortOption<T = MyPicselSortType | PicselBookSortType> {
  type: T;
  label: string;
}

// 내픽셀 정렬 옵션
export const MY_PICSEL_SORT_OPTIONS: SortOption<MyPicselSortType>[] = [
  { type: 'RECENT_DESC', label: '최신 순' },
  { type: 'OLDEST_ASC', label: '오래된 순' },
];

// 픽셀북 정렬 옵션
export const PICSEL_BOOK_SORT_OPTIONS: SortOption<PicselBookSortType>[] = [
  { type: 'latest', label: '최신 생성 순' },
  { type: 'add', label: '사진 추가 순' },
  { type: 'length', label: '사진 개수 순' },
];

interface UseSortActionSheetParams<T = MyPicselSortType | PicselBookSortType> {
  onSort?: (sortType: T) => void;
  options?: SortOption<T>[];
  cancelText?: string;
}

/**
 * Picsel에서 사용하는 정렬 액션시트 훅
 * @param onSort 정렬 타입 선택 시 실행될 콜백 (옵션)
 * @param options 커스텀 정렬 옵션 (기본값: MY_PICSEL_SORT_OPTIONS)
 * @param cancelText 취소 버튼 텍스트 (기본값: '취소')
 */
export const useSortActionSheet = <T = MyPicselSortType | PicselBookSortType>({
  onSort,
  options = MY_PICSEL_SORT_OPTIONS as SortOption<T>[],
  cancelText = '취소',
}: UseSortActionSheetParams<T> = {}) => {
  const showSortSheet = () => {
    const actionSheetOptions = options.map(opt => ({
      label: opt.label,
      onPress: () => onSort?.(opt.type),
    }));

    useActionSheetStore.getState().showActionSheet({
      options: actionSheetOptions,
      cancelText,
    });
  };

  return { showSortSheet };
};
