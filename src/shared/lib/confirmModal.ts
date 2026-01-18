import { useConfirmModalStore } from '@/shared/store/ui/confirmModal';

type DeleteItemType = 'photo' | 'picselBook';

const DELETE_ITEM_CONFIG = {
  photo: {
    unit: '장',
    itemName: '사진',
  },
  picselBook: {
    unit: '개',
    itemName: '픽셀북',
  },
} as const;

/**
 * 삭제 확인 모달을 표시하는 헬퍼 함수
 * @param type 삭제할 아이템 타입 ('photo' | 'picselBook')
 * @param count 삭제할 아이템 개수
 * @param onConfirm 확인 버튼 클릭 시 실행될 함수
 * @param onCancel 취소 버튼 클릭 시 실행될 함수 (선택사항)
 */
export const showDeleteConfirmModal = (
  type: DeleteItemType,
  count: number,
  onConfirm: () => void,
  onCancel?: () => void,
) => {
  const config = DELETE_ITEM_CONFIG[type];

  useConfirmModalStore.getState().showConfirmModal({
    title: `${count}${config.unit}의 ${config.itemName}을 삭제할까요?`,
    message: '삭제 시 복구가 불가능해요',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm,
    onCancel,
  });
};

/**
 * 일반 확인 모달을 표시하는 헬퍼 함수
 * @param message 표시할 메시지
 * @param onConfirm 확인 버튼 클릭 시 실행될 함수
 * @param options 추가 옵션 (title, confirmText, cancelText, onCancel)
 */
export const showConfirmModal = (
  message: string,
  onConfirm: () => void,
  options?: {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    onCancel?: () => void;
  },
) => {
  useConfirmModalStore.getState().showConfirmModal({
    message,
    onConfirm,
    ...options,
  });
};
