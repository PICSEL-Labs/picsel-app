import { CommonResponseType } from '../../types';

export interface PresignedUrlData {
  fileUrl: string;
  presignedUrl: string;
}

export interface PresignedUrlResponse extends CommonResponseType {
  data: PresignedUrlData;
}

export type ImageType = 'PROFILE' | 'PICSELBOOK' | 'PICSEL';
