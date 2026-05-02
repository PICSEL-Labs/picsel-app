export const EXTERNAL_LINKS = {
  terms:
    'https://daisy-tamarillo-7ee.notion.site/2152a4516dff8001bcc4c7fb6a3229da',
  privacy:
    'https://daisy-tamarillo-7ee.notion.site/2672a4516dff801d9ee1d7edbdfa3323',
  notice:
    'https://daisy-tamarillo-7ee.notion.site/2e22a4516dff8019a8f5eb6c96169ad1?v=2e22a4516dff80ff8a36000c693971d6',
  faq: 'https://daisy-tamarillo-7ee.notion.site/PICSEL-34e2a4516dff8089a53cf4ea7fe6d273',
  inquiry:
    'https://docs.google.com/forms/u/0/d/11cldn40YEX12Rr7p3C0syL9xt-1yQT74_J_YU2hqBWE',
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
