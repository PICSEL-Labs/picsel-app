import { useConfirmModalStore } from '@/shared/store/ui/confirmModal';

/**
 * 삭제 확인 모달을 표시하는 헬퍼 함수
 * @param photoCount 삭제할 사진 개수
 * @param onConfirm 확인 버튼 클릭 시 실행될 함수
 * @param onCancel 취소 버튼 클릭 시 실행될 함수 (선택사항)
 */
export const showDeleteConfirmModal = (
  photoCount: number,
  onConfirm: () => void,
  onCancel?: () => void,
) => {
  useConfirmModalStore.getState().showConfirmModal({
    title: `${photoCount}장의 사진을 삭제할까요?`,
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
