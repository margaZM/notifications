import { INotificationRepository } from "../repositories/INotificationRepository";

export class GetAllNotificationsUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute() {
    return await this.notificationRepository.getAllNotifications();
  }
}
