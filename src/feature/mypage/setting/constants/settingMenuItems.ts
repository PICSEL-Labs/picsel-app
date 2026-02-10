export const EXTERNAL_LINKS = {
  terms:
    'https://daisy-tamarillo-7ee.notion.site/2152a4516dff8001bcc4c7fb6a3229da',
  privacy:
    'https://daisy-tamarillo-7ee.notion.site/2672a4516dff801d9ee1d7edbdfa3323',
} as const;

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
