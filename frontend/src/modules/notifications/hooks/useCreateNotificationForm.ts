import { isValidEmail } from "@/src/shared/utils/validators";
import { ChangeEvent, useCallback, useState } from "react";
import {
  Notification,
  NotificationChannel,
} from "@/src/core/notifications/domain/models/Notification";
import { createNotificationSchema } from "@/src/core/notifications/application/validators";

export const useCreateNotificationForm = (selectedItem?: Notification) => {
  const [formData, setFormData] = useState({
    fields: {
      channel: NotificationChannel.EMAIL,
      title: selectedItem?.title || "",
      content: selectedItem?.content || "",
      recipientContactId: selectedItem?.recipientContactId || "",
    },
    errors: {
      channel: "",
      title: "",
      content: "",
      recipientContactId: "",
    },
    touched: {
      channel: false,
      title: false,
      content: false,
      recipientContactId: false,
    },
  });

  const channelOptions = [
    { value: NotificationChannel.EMAIL, label: "Email" },
    { value: NotificationChannel.SMS, label: "SMS" },
    { value: NotificationChannel.PUSH, label: "Push Notification" },
  ];

  const validateSingleField = useCallback(async (name: string, value: any, allFields: any) => {
    try {
      await createNotificationSchema.validateAt(name, { ...allFields, [name]: value });
      return "";
    } catch (error: any) {
      return error.message;
    }
  }, []);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const newFields = { ...formData.fields, [name]: value };
    setFormData((prev) => ({
      ...prev,
      fields: newFields,
      touched: { ...prev.touched, [name]: true },
    }));

    const error = await validateSingleField(name, value, newFields);

    let crossFieldErrors = {};
    if (name === "channel") {
      const titleErr = await validateSingleField("title", newFields.title, newFields);
      const contentErr = await validateSingleField("content", newFields.content, newFields);
      crossFieldErrors = { title: titleErr, content: contentErr };
    }

    setFormData((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error,
        ...crossFieldErrors,
      },
    }));
  };

  const isFormValid =
    Object.values(formData.fields).every((val) => val !== "") &&
    Object.values(formData.errors).every((err) => err === "");

  return { channelOptions, handleChange, formData, isFormValid };
};
