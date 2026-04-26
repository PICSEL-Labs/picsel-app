export interface MenuItem {
  id: string;
  label: string;
  iconType?: 'announcement' | 'help' | 'star';
}

export const MYPAGE_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    label: '공지사항',
    iconType: 'announcement',
  },
  {
    id: '2',
    label: '문의사항',
    iconType: 'help',
  },
  {
    id: '3',
    label: '픽셀 팀원 소개',
    iconType: 'star',
  },
];

import Config from 'react-native-config';

import { MypageNavigationProps } from '@/navigation/route/mypage';

export type MypageScreenName = keyof MypageNavigationProps;

export interface MenuCardItem {
  title: string;
  description: string;
  backgroundColor: string;
  iconType: string | null;
  screenName: MypageScreenName | null;
  link?: string;
}

export const MYPAGE_CARD_ITEMS: MenuCardItem[] = [
  {
    title: '찜한 브랜드 설정',
    description: '내가 찜한 브랜드를 한눈에 보고 관리해요',
    backgroundColor: 'bg-pink-100',
    iconType: 'star',
    screenName: 'BrandSettingScreen',
  },
  {
    title: '앱 후기 남기기',
    description: '솔직한 후기 한 줄이 저희에게 큰 힘이 돼요!',
    backgroundColor: '',
    iconType: null,
    screenName: null,
    link: `itms-apps://apps.apple.com/app/id${Config.APPLE_APP_ID}?action=write-review`,
  },
];
