// 픽셀 추가 요청
export interface PicselUploadRequest {
  picselbookId: string;
  storeId: string;
  takenDate: string;
  title: string;
  content: string;
  imagePaths: string[];
}

// 픽셀 추가 응답
export interface PicselUploadResponse {
  picselId: string;
  picselbookId: string;
  representativeImagePath: string;
  createdAt: string;
}
