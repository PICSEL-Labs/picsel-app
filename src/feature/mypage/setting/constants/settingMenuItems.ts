export interface SettingMenuItem {
  id: string;
  label: string;
  iconType?: 'account' | 'notification' | 'terms' | 'privacy';
  hasRightArrow?: boolean;
}

export const SETTING_MENU_ITEMS: SettingMenuItem[] = [
  {
    id: '1',
    label: '계정 관리',
    iconType: 'account',
    hasRightArrow: false,
  },
  {
    id: '2',
    label: '알림 설정',
    iconType: 'notification',
    hasRightArrow: false,
  },
  {
    id: '3',
    label: '이용약관',
    iconType: 'terms',
    hasRightArrow: true,
  },
  {
    id: '4',
    label: '개인정보처리방침',
    iconType: 'privacy',
    hasRightArrow: true,
  },
];
