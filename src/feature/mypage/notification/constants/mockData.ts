import { Notification } from '../types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: '픽셀 서비스 점검 안내',
    description: '금일 픽셀 서비스 점검 시행 : 3/15 금요일 02:00~04:00',
    date: '2025.12.14',
  },
  {
    id: '2',
    title: '새로운 브랜드가 추가되었어요!',
    description: '인생네컷, 포토이즘 등 5개의 새로운 브랜드가 추가되었습니다.',
    date: '2025.12.13',
  },
  {
    id: '3',
    title: '픽셀 업데이트 안내',
    date: '2025.12.10',
  },
];
