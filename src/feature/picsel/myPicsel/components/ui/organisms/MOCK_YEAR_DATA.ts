interface Photo {
  id: string;
  uri: string;
  date: string;
  storeName: string;
}

export interface MonthGroup {
  month: string;
  photos: Photo[];
}

export interface YearGroup {
  year: string;
  months: MonthGroup[];
}

// Mock data for year/month groupings
export const MOCK_YEAR_DATA: YearGroup[] = [
  {
    year: '2026',
    months: [
      {
        month: '1월',
        photos: [
          {
            id: '2026-1-1',
            uri: 'https://picsum.photos/200/300',
            date: '2026-01-07',
            storeName: '하루필름 사진관',
          },
          {
            id: '2026-1-2',
            uri: 'https://picsum.photos/201/301',
            date: '2026-01-05',
            storeName: '인생네컷 홍대점',
          },
          {
            id: '2026-1-3',
            uri: 'https://picsum.photos/202/302',
            date: '2026-01-03',
            storeName: '포토이즘 박스 강남점',
          },
          {
            id: '2026-1-4',
            uri: 'https://picsum.photos/203/303',
            date: '2026-01-02',
            storeName: '셀픽스 신촌점',
          },
          {
            id: '2026-1-5',
            uri: 'https://picsum.photos/204/304',
            date: '2026-01-01',
            storeName: '포토그레이 명동점',
          },
        ],
      },
    ],
  },
  {
    year: '2025',
    months: [
      {
        month: '12월',
        photos: [
          {
            id: '2025-12-1',
            uri: 'https://picsum.photos/205/305',
            date: '2025-12-28',
            storeName: '셀픽스 신촌점',
          },
          {
            id: '2025-12-2',
            uri: 'https://picsum.photos/206/306',
            date: '2025-12-25',
            storeName: '포토그레이 명동점',
          },
          {
            id: '2025-12-3',
            uri: 'https://picsum.photos/207/307',
            date: '2025-12-20',
            storeName: '모노맨션 이태원점',
          },
          {
            id: '2025-12-4',
            uri: 'https://picsum.photos/208/308',
            date: '2025-12-15',
            storeName: '하루필름 사진관',
          },
          {
            id: '2025-12-5',
            uri: 'https://picsum.photos/209/309',
            date: '2025-12-10',
            storeName: '인생네컷 강남점',
          },
          {
            id: '2025-12-6',
            uri: 'https://picsum.photos/210/310',
            date: '2025-12-05',
            storeName: '포토매틱 홍대점',
          },
        ],
      },
      {
        month: '11월',
        photos: [
          {
            id: '2025-11-1',
            uri: 'https://picsum.photos/211/311',
            date: '2025-11-28',
            storeName: '인생네컷 건대점',
          },
          {
            id: '2025-11-2',
            uri: 'https://picsum.photos/212/312',
            date: '2025-11-20',
            storeName: '포토매틱 성수점',
          },
          {
            id: '2025-11-3',
            uri: 'https://picsum.photos/213/313',
            date: '2025-11-15',
            storeName: '플리즈 사진관',
          },
          {
            id: '2025-11-4',
            uri: 'https://picsum.photos/214/314',
            date: '2025-11-10',
            storeName: '셀픽스 합정점',
          },
        ],
      },
      {
        month: '10월',
        photos: [
          {
            id: '2025-10-1',
            uri: 'https://picsum.photos/215/315',
            date: '2025-10-25',
            storeName: '셀픽스 잠실점',
          },
          {
            id: '2025-10-2',
            uri: 'https://picsum.photos/216/316',
            date: '2025-10-18',
            storeName: '포토이즘 박스 종로점',
          },
          {
            id: '2025-10-3',
            uri: 'https://picsum.photos/217/317',
            date: '2025-10-10',
            storeName: '인생네컷 신림점',
          },
          {
            id: '2025-10-4',
            uri: 'https://picsum.photos/218/318',
            date: '2025-10-05',
            storeName: '하루필름 사진관',
          },
        ],
      },
      {
        month: '8월',
        photos: [
          {
            id: '2025-8-1',
            uri: 'https://picsum.photos/219/319',
            date: '2025-08-28',
            storeName: '모노맨션 연남점',
          },
          {
            id: '2025-8-2',
            uri: 'https://picsum.photos/220/320',
            date: '2025-08-20',
            storeName: '포토그레이 명동점',
          },
          {
            id: '2025-8-3',
            uri: 'https://picsum.photos/221/321',
            date: '2025-08-15',
            storeName: '인생네컷 건대점',
          },
        ],
      },
      {
        month: '6월',
        photos: [
          {
            id: '2025-6-1',
            uri: 'https://picsum.photos/222/322',
            date: '2025-06-25',
            storeName: '셀픽스 신촌점',
          },
          {
            id: '2025-6-2',
            uri: 'https://picsum.photos/223/323',
            date: '2025-06-18',
            storeName: '포토매틱 성수점',
          },
        ],
      },
      {
        month: '3월',
        photos: [
          {
            id: '2025-3-1',
            uri: 'https://picsum.photos/224/324',
            date: '2025-03-20',
            storeName: '하루필름 사진관',
          },
          {
            id: '2025-3-2',
            uri: 'https://picsum.photos/225/325',
            date: '2025-03-15',
            storeName: '인생네컷 홍대점',
          },
          {
            id: '2025-3-3',
            uri: 'https://picsum.photos/226/326',
            date: '2025-03-10',
            storeName: '플리즈 사진관',
          },
          {
            id: '2025-3-4',
            uri: 'https://picsum.photos/227/327',
            date: '2025-03-05',
            storeName: '포토이즘 박스 강남점',
          },
          {
            id: '2025-3-5',
            uri: 'https://picsum.photos/228/328',
            date: '2025-03-01',
            storeName: '모노맨션 이태원점',
          },
        ],
      },
      {
        month: '1월',
        photos: [
          {
            id: '2025-1-1',
            uri: 'https://picsum.photos/229/329',
            date: '2025-01-28',
            storeName: '셀픽스 잠실점',
          },
          {
            id: '2025-1-2',
            uri: 'https://picsum.photos/230/330',
            date: '2025-01-20',
            storeName: '포토그레이 홍대점',
          },
          {
            id: '2025-1-3',
            uri: 'https://picsum.photos/231/331',
            date: '2025-01-10',
            storeName: '인생네컷 강남점',
          },
        ],
      },
    ],
  },
  {
    year: '2024',
    months: [
      {
        month: '12월',
        photos: [
          {
            id: '2024-12-1',
            uri: 'https://picsum.photos/232/332',
            date: '2024-12-30',
            storeName: '모노맨션 연남점',
          },
          {
            id: '2024-12-2',
            uri: 'https://picsum.photos/233/333',
            date: '2024-12-25',
            storeName: '포토그레이 홍대점',
          },
          {
            id: '2024-12-3',
            uri: 'https://picsum.photos/234/334',
            date: '2024-12-20',
            storeName: '셀픽스 합정점',
          },
          {
            id: '2024-12-4',
            uri: 'https://picsum.photos/235/335',
            date: '2024-12-15',
            storeName: '인생네컷 홍대점',
          },
        ],
      },
      {
        month: '11월',
        photos: [
          {
            id: '2024-11-1',
            uri: 'https://picsum.photos/236/336',
            date: '2024-11-28',
            storeName: '인생네컷 강남점',
          },
          {
            id: '2024-11-2',
            uri: 'https://picsum.photos/237/337',
            date: '2024-11-20',
            storeName: '포토매틱 압구정점',
          },
        ],
      },
      {
        month: '9월',
        photos: [
          {
            id: '2024-9-1',
            uri: 'https://picsum.photos/238/338',
            date: '2024-09-25',
            storeName: '하루필름 사진관',
          },
          {
            id: '2024-9-2',
            uri: 'https://picsum.photos/239/339',
            date: '2024-09-15',
            storeName: '플리즈 사진관',
          },
          {
            id: '2024-9-3',
            uri: 'https://picsum.photos/240/340',
            date: '2024-09-10',
            storeName: '셀픽스 신촌점',
          },
        ],
      },
      {
        month: '5월',
        photos: [
          {
            id: '2024-5-1',
            uri: 'https://picsum.photos/241/341',
            date: '2024-05-20',
            storeName: '포토이즘 박스 강남점',
          },
        ],
      },
      {
        month: '2월',
        photos: [
          {
            id: '2024-2-1',
            uri: 'https://picsum.photos/242/342',
            date: '2024-02-28',
            storeName: '인생네컷 건대점',
          },
          {
            id: '2024-2-2',
            uri: 'https://picsum.photos/243/343',
            date: '2024-02-14',
            storeName: '포토매틱 성수점',
          },
          {
            id: '2024-2-3',
            uri: 'https://picsum.photos/244/344',
            date: '2024-02-10',
            storeName: '모노맨션 이태원점',
          },
          {
            id: '2024-2-4',
            uri: 'https://picsum.photos/245/345',
            date: '2024-02-05',
            storeName: '셀픽스 잠실점',
          },
        ],
      },
    ],
  },
];
