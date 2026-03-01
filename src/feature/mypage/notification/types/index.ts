export interface NotificationPreview {
  notificationId: number;
  title: string;
  bodyPreview: string;
  type: 'NORMAL';
  publishedAt: string;
  receivedAt: string;
  isRead: boolean;
}

export interface NotificationDetail {
  notificationId: number;
  title: string;
  body: string;
  type: 'NORMAL';
  publishedAt: string;
  receivedAt: string;
  isRead: boolean;
}
