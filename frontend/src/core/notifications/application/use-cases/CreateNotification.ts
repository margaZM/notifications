import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";
import { CreateNotificationDto } from "../../infrastructure/dtos/CreateNotificationDto";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { validateNotificationData } from "../validators";

export class CreateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: CreateNotificationDto) {
    const errorMessage = validateNotificationData(data);
    if (errorMessage) {
      throw new ValidationError(errorMessage);
    }
    return await this.notificationRepository.createNotification(data);
  }
}
