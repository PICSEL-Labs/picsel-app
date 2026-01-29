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
