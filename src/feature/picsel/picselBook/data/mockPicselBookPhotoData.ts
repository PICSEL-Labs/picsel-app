// TODO: 실제 API 연동 시 제거

export interface Photo {
  id: string;
  uri: string;
  date: string;
  storeName: string;
}

export interface PicselBookPhotoData {
  bookId: string;
  bookTitle: string;
  photos: Photo[];
}

export const MOCK_PICSEL_BOOK_PHOTO_DATA: PicselBookPhotoData[] = [
  {
    bookId: '1',
    bookTitle: '여행',
    photos: [
      {
        id: 'book1-1',
        uri: 'https://picsum.photos/200/300?random=1',
        date: '2024-12-28',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book1-2',
        uri: 'https://picsum.photos/201/301?random=2',
        date: '2024-12-28',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book1-3',
        uri: 'https://picsum.photos/202/302?random=3',
        date: '2024-12-27',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book1-4',
        uri: 'https://picsum.photos/203/303?random=4',
        date: '2024-12-27',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book1-5',
        uri: 'https://picsum.photos/204/304?random=5',
        date: '2024-12-26',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book1-6',
        uri: 'https://picsum.photos/205/305?random=6',
        date: '2024-12-26',
        storeName: '모노맨션 이태원점',
      },
      {
        id: 'book1-7',
        uri: 'https://picsum.photos/206/306?random=7',
        date: '2024-12-25',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book1-8',
        uri: 'https://picsum.photos/207/307?random=8',
        date: '2024-12-25',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book1-9',
        uri: 'https://picsum.photos/208/308?random=9',
        date: '2024-12-24',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book1-10',
        uri: 'https://picsum.photos/209/309?random=10',
        date: '2024-12-24',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book1-11',
        uri: 'https://picsum.photos/210/310?random=11',
        date: '2024-12-23',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book1-12',
        uri: 'https://picsum.photos/211/311?random=12',
        date: '2024-12-23',
        storeName: '모노맨션 이태원점',
      },
      {
        id: 'book1-13',
        uri: 'https://picsum.photos/212/312?random=13',
        date: '2024-12-22',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book1-14',
        uri: 'https://picsum.photos/213/313?random=14',
        date: '2024-12-22',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book1-15',
        uri: 'https://picsum.photos/214/314?random=15',
        date: '2024-12-21',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book1-16',
        uri: 'https://picsum.photos/215/315?random=16',
        date: '2024-12-21',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book1-17',
        uri: 'https://picsum.photos/216/316?random=17',
        date: '2024-12-20',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book1-18',
        uri: 'https://picsum.photos/217/317?random=18',
        date: '2024-12-20',
        storeName: '모노맨션 이태원점',
      },
      {
        id: 'book1-19',
        uri: 'https://picsum.photos/218/318?random=19',
        date: '2024-12-19',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book1-20',
        uri: 'https://picsum.photos/219/319?random=20',
        date: '2024-12-19',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book1-21',
        uri: 'https://picsum.photos/220/320?random=21',
        date: '2024-12-18',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book1-22',
        uri: 'https://picsum.photos/221/321?random=22',
        date: '2024-12-18',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book1-23',
        uri: 'https://picsum.photos/222/322?random=23',
        date: '2024-12-17',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book1-24',
        uri: 'https://picsum.photos/223/323?random=24',
        date: '2024-12-17',
        storeName: '모노맨션 이태원점',
      },
      {
        id: 'book1-25',
        uri: 'https://picsum.photos/224/324?random=25',
        date: '2024-12-16',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book1-26',
        uri: 'https://picsum.photos/225/325?random=26',
        date: '2024-12-16',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book1-27',
        uri: 'https://picsum.photos/226/326?random=27',
        date: '2024-12-15',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book1-28',
        uri: 'https://picsum.photos/227/327?random=28',
        date: '2024-12-15',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book1-29',
        uri: 'https://picsum.photos/228/328?random=29',
        date: '2024-12-14',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book1-30',
        uri: 'https://picsum.photos/229/329?random=30',
        date: '2024-12-14',
        storeName: '모노맨션 이태원점',
      },
    ],
  },
  {
    bookId: '2',
    bookTitle: '가족',
    photos: [
      {
        id: 'book2-1',
        uri: 'https://picsum.photos/230/330?random=31',
        date: '2024-12-25',
        storeName: '셀픽스 신촌점',
      },
      {
        id: 'book2-2',
        uri: 'https://picsum.photos/231/331?random=32',
        date: '2024-12-24',
        storeName: '포토그레이 명동점',
      },
      {
        id: 'book2-3',
        uri: 'https://picsum.photos/232/332?random=33',
        date: '2024-12-23',
        storeName: '하루필름 사진관',
      },
      {
        id: 'book2-4',
        uri: 'https://picsum.photos/233/333?random=34',
        date: '2024-12-22',
        storeName: '인생네컷 홍대점',
      },
      {
        id: 'book2-5',
        uri: 'https://picsum.photos/234/334?random=35',
        date: '2024-12-21',
        storeName: '모노맨션 이태원점',
      },
    ],
  },
  {
    bookId: '3',
    bookTitle: '친구들',
    photos: [],
  },
  {
    bookId: '4',
    bookTitle: '데이트',
    photos: [
      {
        id: 'book4-1',
        uri: 'https://picsum.photos/235/335?random=36',
        date: '2024-12-20',
        storeName: '모노맨션 이태원점',
      },
      {
        id: 'book4-2',
        uri: 'https://picsum.photos/236/336?random=37',
        date: '2024-12-19',
        storeName: '포토이즘 박스 강남점',
      },
      {
        id: 'book4-3',
        uri: 'https://picsum.photos/237/337?random=38',
        date: '2024-12-18',
        storeName: '셀픽스 신촌점',
      },
    ],
  },
];
