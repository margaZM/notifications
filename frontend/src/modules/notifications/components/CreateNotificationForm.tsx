"use client";
import { CustomButton } from "../../../shared/components/ui/CustomButton";
import { CustomInput } from "@/src/shared/components/ui/CustomInput";
import { CustomSelect } from "@/src/shared/components/ui/CustomSelect";
import { CustomTextarea } from "@/src/shared/components/ui/CustomTextarea";
import { useCreateNotificationForm } from "../hooks/useCreateNotificationForm";
import { FormEvent, useMemo, useState } from "react";
import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { NotificationRepository } from "@/src/core/notifications/infrastructure/repositories/HttpNotificationRepository";
import { CreateNotificationUseCase } from "@/src/core/notifications/application/use-cases/CreateNotification";
import { CreateNotificationDto } from "../../../core/notifications/infrastructure/dtos/CreateNotificationDto";
import { useNotification } from "@/src/shared/hooks/useNotification";
import { ToastNotification } from "@/src/shared/components/ui/ToastNotification";
import { Notification } from "@/src/core/notifications/domain/models/Notification";
import { UpdateNotificationUseCase } from "@/src/core/notifications/application/use-cases/UpdateNotification";
import { UpdateNotificationDto } from "@/src/core/notifications/infrastructure/dtos/UpdateNotificationDto";
import { useNotificationsStore } from "../stores/notificationsStore";

interface CreateNotificationFormProps {
  action: "create" | "edit";
  selectedItem?: Notification;
  closeModal: (modalName: string) => void;
}

export const CreateNotificationForm = ({
  selectedItem,
  action,
  closeModal,
}: CreateNotificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { notification, showNotification, closeNotification } = useNotification();
  const { channelOptions, handleChange, formData, isFormValid, validators } =
    useCreateNotificationForm(selectedItem);

  const { notifications, setNotifications } = useNotificationsStore();

  const { errors, touched } = formData;
  const { title, content, channel, recipientContactId } = formData.fields;

  const { createNotificationUseCase, updateNotificationUseCase } = useMemo(() => {
    const apiService = new ApiService();
    const repository = new NotificationRepository(apiService);
    return {
      createNotificationUseCase: new CreateNotificationUseCase(repository),
      updateNotificationUseCase: new UpdateNotificationUseCase(repository),
    };
  }, []);

  const handleCreateNotification = async (values: CreateNotificationDto) => {
    try {
      setIsLoading(true);
      const notification = await createNotificationUseCase.execute(values);
      showNotification("Notification created successfully.", "success");
      updateNotificationsInStore(notification);
      closeModal("createEditNotification");
    } catch (error: any) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotificationsInStore = (newNotification: Notification) => {
    let updatedNotifications: Notification[] = [];
    if (action === "edit") {
      updatedNotifications = notifications.map((notification) =>
        notification.notificationId === newNotification.notificationId
          ? newNotification
          : notification,
      );
    } else {
      updatedNotifications = [newNotification, ...notifications];
    }
    setNotifications(updatedNotifications);
  };

  const handleUpdateNotification = async (values: UpdateNotificationDto) => {
    try {
      setIsLoading(true);
      const notification = await updateNotificationUseCase.execute(values);
      showNotification("Notification created successfully.", "success");
      updateNotificationsInStore(notification);
      closeModal("createEditNotification");
    } catch (error: any) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const payload = formData.fields;
      if (action === "create") {
        handleCreateNotification(payload);
      } else {
        if (selectedItem?.notificationId) {
          handleUpdateNotification({
            ...selectedItem,
            ...payload,
            notificationId: selectedItem.notificationId,
          } as UpdateNotificationDto);
        } else {
          showNotification("Missing notification ID for update.", "error");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {notification.isOpen && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
        <CustomSelect
          options={channelOptions}
          onChange={handleChange}
          value={channel}
          errorMessage={touched.channel ? errors.channel : ""}
          isvalid={!(touched.channel && errors.channel)}
          label="Channel"
          name="channel"
        />
        <CustomInput
          id="title"
          label="Title"
          name="title"
          value={title}
          type="text"
          placeholder="Notification title..."
          onChange={handleChange}
          isvalid={!(touched.title && errors.title)}
          message={touched.title ? errors.title : ""}
          validators={validators.title}
        />
        <CustomTextarea
          id="content"
          rows={2}
          label="Description"
          name="content"
          value={content}
          placeholder="Write your content message here..."
          onChange={handleChange}
          isvalid={!content || !errors.content}
          errorMessage={touched.content ? errors.content : ""}
          validators={validators.content}
        />
        <CustomInput
          id="recipientContactId"
          label="Recipient Id"
          name="recipientContactId"
          value={recipientContactId}
          type="text"
          placeholder="Contact ID..."
          onChange={handleChange}
          isvalid={!recipientContactId || !errors.recipientContactId}
          message={recipientContactId && errors.recipientContactId ? errors.recipientContactId : ""}
          validators={validators.recipientContactId}
        />
        <div className="pt-6">
          <CustomButton
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={!isFormValid}
          >
            Send Notification
          </CustomButton>
        </div>
      </form>
    </>
  );
};
