import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";
import { CreateNotificationDto } from "../../infrastructure/dtos/CreateNotificationDto";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { createNotificationSchema } from "../validators";

export class CreateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: CreateNotificationDto) {
    try {
      const validatedData = await createNotificationSchema.validate(data, { abortEarly: false });
      return await this.notificationRepository.createNotification(validatedData);
    } catch (err: any) {
      throw new ValidationError(err.errors?.join(", ") || err.message);
    }
  }
}
