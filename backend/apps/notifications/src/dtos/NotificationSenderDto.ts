import { NotificationStatus } from "@margazm/database";

export interface NotificationSenderInput {
  title: string;
  content: string;
  channel: string;
  phoneNumber?: string;
  email?: string;
  deviceToken?: string;
}

export interface NotificationSenderResponse {
  status: NotificationStatus;
  sendAt: Date;
  errorCode?: number;
  errorMessage?: string;
}
