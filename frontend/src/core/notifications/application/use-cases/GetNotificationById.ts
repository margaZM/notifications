import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";
import { INotificationRepository } from "../repositories/INotificationRepository";

export class GetNotificationByIdUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(notificationId: string) {
    if (!notificationId) throw new ValidationError("Notification ID is required.");
    return await this.notificationRepository.getNotificationById(notificationId);
  }
}
