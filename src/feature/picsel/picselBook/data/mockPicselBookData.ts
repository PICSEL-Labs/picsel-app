import { MOCK_PICSEL_BOOK_PHOTO_DATA } from './mockPicselBookPhotoData';

export interface PicselBook {
  id: string;
  title: string;
  photoCount: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 사진 데이터로부터 픽셀북 리스트 생성
export const MOCK_PICSEL_BOOK_DATA: PicselBook[] =
  MOCK_PICSEL_BOOK_PHOTO_DATA.map(book => ({
    id: book.bookId,
    title: book.bookTitle,
    photoCount: book.photos.length,
    coverImage: book.photos[0]?.uri,
    createdAt: book.photos[0]?.date || '2024-01-01',
    updatedAt: book.photos[book.photos.length - 1]?.date || '2024-01-01',
  }));
