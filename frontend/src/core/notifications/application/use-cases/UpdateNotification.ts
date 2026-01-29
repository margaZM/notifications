import { ValidationError } from "yup";
import { UpdateNotificationDto } from "../../infrastructure/dtos/UpdateNotificationDto";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { validateUpdateNotification } from "../validators";

export class UpdateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: UpdateNotificationDto) {
    const errorMessage = validateUpdateNotification(data);
    if (errorMessage) {
      throw new ValidationError(errorMessage);
    }
    return await this.notificationRepository.createNotification(data);
  }
}
