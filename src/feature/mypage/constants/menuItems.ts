export interface MenuItem {
  id: string;
  label: string;
  onPress: () => void;
}

export const MYPAGE_MENU_ITEMS: Omit<MenuItem, 'onPress'>[] = [
  {
    id: '1',
    label: '공지사항',
  },
  {
    id: '2',
    label: '문의사항',
  },
  {
    id: '3',
    label: '픽셀 팀원 소개',
  },
];
