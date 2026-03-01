export interface NotificationBase {
  notificationId: number;
  title: string;
  type: 'NORMAL';
  publishedAt: string;
  receivedAt: string;
  isRead: boolean;
}

export interface NotificationPreview extends NotificationBase {
  bodyPreview: string;
}

export interface NotificationDetail extends NotificationBase {
  body: string;
}
