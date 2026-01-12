export interface PicselBook {
  id: string;
  title: string;
  photoCount: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_PICSEL_BOOK_DATA: PicselBook[] = [
  {
    id: '1',
    title: '여행',
    photoCount: 24,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    title: '친구들',
    photoCount: 18,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
  },
  {
    id: '3',
    title: '데이트',
    photoCount: 32,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22',
  },
  {
    id: '4',
    title: '가족',
    photoCount: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    title: '특별한 순간들 테스트 테스트',
    photoCount: 8,
    createdAt: '2023-12-20',
    updatedAt: '2024-01-10',
  },
  {
    id: '6',
    title: '2023 겨울',
    photoCount: 42,
    createdAt: '2023-12-01',
    updatedAt: '2024-01-05',
  },
];
