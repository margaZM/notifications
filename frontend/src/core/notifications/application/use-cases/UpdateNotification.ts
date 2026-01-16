import { ValidationError } from "yup";
import { UpdateNotificationDto } from "../../infrastructure/dtos/UpdateNotificationDto";
import { INotificationRepository } from "../repositories/INotificationRepository";
import { updateNotificationShema } from "../validators";

export class UpdateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: UpdateNotificationDto) {
    try {
      const validatedData = await updateNotificationShema.validate(data, { abortEarly: false });
      return await this.notificationRepository.updateNotification(validatedData);
    } catch (err: any) {
      throw new ValidationError(err.errors?.join(", ") || err.message);
    }
  }
}
