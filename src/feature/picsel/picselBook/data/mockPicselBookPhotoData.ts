// TODO: 실제 API 연동 시 제거

export interface Photo {
  id: string;
  uri: string;
  date: string;
  storeName: string;
  title?: string;
  content?: string;
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
        title: '첫눈 오는 날',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-2',
        uri: 'https://picsum.photos/201/301?random=2',
        date: '2024-12-28',
        storeName: '인생네컷 홍대점',
        title: '은영이 생일날 홍대에서',
        content:
          'OO이 생일을 기념으로 오랜만에 다 같이 홍대에서 만났다. 사로의 근황을 얘기하느라 배가 터지게 먹고 웃어서 존나',
      },
      {
        id: 'book1-3',
        uri: 'https://picsum.photos/202/302?random=3',
        date: '2024-12-27',
        storeName: '포토이즘 박스 강남점',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-4',
        uri: 'https://picsum.photos/203/303?random=4',
        date: '2024-12-27',
        storeName: '셀픽스 신촌점',
        title: '비 오는 날',
        content:
          '약속 시간보다 일찍 도착해서 비를 피하고 근처 상가로 들어갔다. 창밖으로 빗방울이 떨어지는 것만 보고 있어도 충나',
      },
      {
        id: 'book1-5',
        uri: 'https://picsum.photos/204/304?random=5',
        date: '2024-12-26',
        storeName: '포토그레이 명동점',
        title: '겨울 산책',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-6',
        uri: 'https://picsum.photos/205/305?random=6',
        date: '2024-12-26',
        storeName: '모노맨션 이태원점',
        title: '크리스마스 모임',
        content:
          '친구들과 크리스마스를 맞아 이태원에서 만났다. 다들 한 해 마무리하느라 바빴지만 이렇게 모이니 좋았다',
      },
      {
        id: 'book1-7',
        uri: 'https://picsum.photos/206/306?random=7',
        date: '2024-12-25',
        storeName: '하루필름 사진관',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-8',
        uri: 'https://picsum.photos/207/307?random=8',
        date: '2024-12-25',
        storeName: '인생네컷 홍대점',
        title: '홍대 연말 파티',
        content:
          '연말을 맞아 홍대에서 친구들과 파티를 했다. 음악도 듣고 사진도 찍고 정말 즐거운 하루였다',
      },
      {
        id: 'book1-9',
        uri: 'https://picsum.photos/208/308?random=9',
        date: '2024-12-24',
        storeName: '포토이즘 박스 강남점',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-10',
        uri: 'https://picsum.photos/209/309?random=10',
        date: '2024-12-24',
        storeName: '셀픽스 신촌점',
        title: '신촌 데이트',
        content:
          '오랜만에 신촌에 나왔다. 예전 학교 다닐 때 자주 가던 카페도 들르고 추억 여행을 했다',
      },
      {
        id: 'book1-11',
        uri: 'https://picsum.photos/210/310?random=11',
        date: '2024-12-23',
        storeName: '포토그레이 명동점',
        title: '명동 쇼핑',
        content:
          '명동에서 크리스마스 선물을 사러 갔다. 거리에 캐럴이 울려퍼지고 분위기가 너무 좋았다',
      },
      {
        id: 'book1-12',
        uri: 'https://picsum.photos/211/311?random=12',
        date: '2024-12-23',
        storeName: '모노맨션 이태원점',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-13',
        uri: 'https://picsum.photos/212/312?random=13',
        date: '2024-12-22',
        storeName: '하루필름 사진관',
        title: '주말 나들이',
        content:
          '날씨가 좋아서 친구들과 함께 공원에 갔다. 사진도 찍고 맛있는 것도 먹고 힐링했다',
      },
      {
        id: 'book1-14',
        uri: 'https://picsum.photos/213/313?random=14',
        date: '2024-12-22',
        storeName: '인생네컷 홍대점',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-15',
        uri: 'https://picsum.photos/214/314?random=15',
        date: '2024-12-21',
        storeName: '포토이즘 박스 강남점',
        title: '강남 카페 투어',
        content:
          '친구와 강남 카페 투어를 했다. SNS에서 유명한 카페들을 돌아다니며 사진도 많이 찍었다',
      },
      {
        id: 'book1-16',
        uri: 'https://picsum.photos/215/315?random=16',
        date: '2024-12-21',
        storeName: '셀픽스 신촌점',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-17',
        uri: 'https://picsum.photos/216/316?random=17',
        date: '2024-12-20',
        storeName: '포토그레이 명동점',
        title: '저녁 약속',
        content:
          '오랜만에 만난 친구와 명동에서 저녁을 먹었다. 이야기하다 보니 시간 가는 줄 몰랐다',
      },
      {
        id: 'book1-18',
        uri: 'https://picsum.photos/217/317?random=18',
        date: '2024-12-20',
        storeName: '모노맨션 이태원점',
        title: '이태원 야경',
        content:
          '이태원 야경이 너무 예뻐서 사진을 찍었다. 밤 공기도 시원하고 기분 좋은 저녁이었다',
      },
      {
        id: 'book1-19',
        uri: 'https://picsum.photos/218/318?random=19',
        date: '2024-12-19',
        storeName: '하루필름 사진관',
        title: '제목 입력',
        content:
          '✏️ 이 날의 추억을 기록해보아요! (기억에 남은 순간, 감정, 에피소드 등을 자유롭게 남겨보세요)',
      },
      {
        id: 'book1-20',
        uri: 'https://picsum.photos/219/319?random=20',
        date: '2024-12-19',
        storeName: '인생네컷 홍대점',
        title: '홍대 버스킹',
        content:
          '홍대에서 버스킹 구경을 했다. 음악도 좋고 분위기도 좋아서 오래 머물렀다',
      },
      {
        id: 'book1-21',
        uri: 'https://picsum.photos/220/320?random=21',
        date: '2024-12-18',
        storeName: '포토이즘 박스 강남점',
        title: '겨울 산책',
        content:
          '날씨가 추웠지만 겨울 풍경이 너무 예뻐서 산책을 했다. 따뜻한 코코아 한 잔이 생각났다',
      },
      {
        id: 'book1-22',
        uri: 'https://picsum.photos/221/321?random=22',
        date: '2024-12-18',
        storeName: '셀픽스 신촌점',
        title: '제목 입력',
      },
      {
        id: 'book1-23',
        uri: 'https://picsum.photos/222/322?random=23',
        date: '2024-12-17',
        storeName: '포토그레이 명동점',
        title: '명동 나들이',
        content:
          '주말에 명동에 나갔다. 사람들이 많아서 북적였지만 활기찬 분위기가 좋았다',
      },
      {
        id: 'book1-24',
        uri: 'https://picsum.photos/223/323?random=24',
        date: '2024-12-17',
        storeName: '모노맨션 이태원점',
        title: '제목 입력',
      },
      {
        id: 'book1-25',
        uri: 'https://picsum.photos/224/324?random=25',
        date: '2024-12-16',
        storeName: '하루필름 사진관',
        title: '친구들과의 시간',
        content:
          '오랜만에 친구들을 만나서 이야기꽃을 피웠다. 웃음이 끊이지 않는 하루였다',
      },
      {
        id: 'book1-26',
        uri: 'https://picsum.photos/225/325?random=26',
        date: '2024-12-16',
        storeName: '인생네컷 홍대점',
        title: '제목 입력',
      },
      {
        id: 'book1-27',
        uri: 'https://picsum.photos/226/326?random=27',
        date: '2024-12-15',
        storeName: '포토이즘 박스 강남점',
        title: '강남역 모임',
        content:
          '강남역에서 동창들과 모였다. 근황 토크하면서 즐거운 시간을 보냈다',
      },
      {
        id: 'book1-28',
        uri: 'https://picsum.photos/227/327?random=28',
        date: '2024-12-15',
        storeName: '셀픽스 신촌점',
        title: '제목 입력',
      },
      {
        id: 'book1-29',
        uri: 'https://picsum.photos/228/328?random=29',
        date: '2024-12-14',
        storeName: '포토그레이 명동점',
        title: '명동 디저트 투어',
        content: '명동에서 유명한 디저트 가게들을 돌아다녔다. 달콤한 하루였다',
      },
      {
        id: 'book1-30',
        uri: 'https://picsum.photos/229/329?random=30',
        date: '2024-12-14',
        storeName: '모노맨션 이태원점',
        title: '제목 입력',
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
        title: '크리스마스 가족 모임',
        content:
          '온 가족이 모여서 크리스마스를 보냈다. 맛있는 음식과 따뜻한 대화가 있는 행복한 하루였다',
      },
      {
        id: 'book2-2',
        uri: 'https://picsum.photos/231/331?random=32',
        date: '2024-12-24',
        storeName: '포토그레이 명동점',
        title: '제목 입력',
      },
      {
        id: 'book2-3',
        uri: 'https://picsum.photos/232/332?random=33',
        date: '2024-12-23',
        storeName: '하루필름 사진관',
        title: '부모님과 외출',
        content:
          '부모님과 함께 오랜만에 외출했다. 좋은 시간을 보내서 기분이 좋았다',
      },
      {
        id: 'book2-4',
        uri: 'https://picsum.photos/233/333?random=34',
        date: '2024-12-22',
        storeName: '인생네컷 홍대점',
        title: '제목 입력',
      },
      {
        id: 'book2-5',
        uri: 'https://picsum.photos/234/334?random=35',
        date: '2024-12-21',
        storeName: '모노맨션 이태원점',
        title: '가족 외식',
        content: '가족들과 맛있는 저녁을 먹었다. 다 같이 모이니 행복했다',
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
        title: '이태원 데이트',
        content:
          '이태원에서 데이트를 했다. 맛있는 음식도 먹고 예쁜 카페도 가고 즐거운 하루였다',
      },
      {
        id: 'book4-2',
        uri: 'https://picsum.photos/236/336?random=37',
        date: '2024-12-19',
        storeName: '포토이즘 박스 강남점',
        title: '제목 입력',
      },
      {
        id: 'book4-3',
        uri: 'https://picsum.photos/237/337?random=38',
        date: '2024-12-18',
        storeName: '셀픽스 신촌점',
        title: '신촌 산책',
        content:
          '신촌에서 산책하며 좋은 시간을 보냈다. 날씨도 좋고 분위기도 좋아서 기분이 좋았다',
      },
    ],
  },
];
