export const NOTIFICATION_SETTING_ITEMS = [
  {
    id: 'picsel-news',
    title: '픽셀 소식',
    description: '픽셀 공지 및 서비스 관련 알림',
  },
  {
    id: 'event-news',
    title: '이벤트 소식',
    description: '픽셀 이벤트 및 혜택 정보 알림',
  },
] as const;

export const PERMISSION_ALERT = {
  title: '알림 설정',
  message:
    '기기의 알림 설정이 꺼져있어요!\n휴대폰 설정 > 알림 > 픽셀에서\n설정을 변경해주세요',
  cancelText: '취소',
  confirmText: '설정 변경하기',
} as const;

export const PICSEL_NEWS_TOAST = {
  agree: '픽셀 소식 알림 수신에 동의했어요',
  reject: '픽셀 소식 알림 수신을 거부했어요',
} as const;

export const EVENT_REJECT_ALERT = {
  title: '이벤트 소식 알림 수신 거부',
  message:
    '알림을 받지 않으면 혜택과 이벤트 정보를\n받으실 수 없어요\n그래도 거부하시겠어요?',
  cancelText: '계속 받기',
  confirmText: '거부하기',
} as const;

export const EVENT_REJECT_CONFIRM_ALERT = {
  title: '이벤트 소식 알림 설정 해제',
  message: (dateStr: string) =>
    `이벤트·혜택 등 마케팅 정보 수신을\n거부하셨습니다\n설정에서 언제든 변경할 수 있어요\n(거부 일자: ${dateStr})`,
  confirmText: '확인',
} as const;

export const EVENT_AGREE_ALERT = {
  title: '이벤트 소식 알림 동의',
  message:
    '이벤트·혜택 등 마케팅 정보를\n푸시 알림으로 받아보시겠어요?\n동의 후 언제든 설정에서 변경할 수 있어요',
  cancelText: '취소',
  confirmText: '동의하고 알림받기',
} as const;

export const EVENT_AGREE_CONFIRM_ALERT = {
  title: '이벤트 소식 알림 설정 완료',
  message: (dateStr: string) =>
    `이벤트·혜택 등 마케팅 정보 수신에\n동의하셨습니다\n설정에서 언제든 변경할 수 있어요\n(동의 일자: ${dateStr})`,
  confirmText: '확인',
} as const;
