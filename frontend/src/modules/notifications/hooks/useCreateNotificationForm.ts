import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  Notification,
  NotificationChannel,
} from "@/src/core/notifications/domain/models/Notification";
import { CHANNEL_RULES } from "@/src/core/notifications/application/validators";
import { generateErrors, valid } from "@/src/shared/utils/validators";

export const useCreateNotificationForm = (selectedItem?: Notification) => {
  const [formData, setFormData] = useState({
    fields: {
      channel: NotificationChannel.EMAIL,
      title: selectedItem?.title || "",
      content: selectedItem?.content || "",
      recipientContactId: selectedItem?.recipientContactId || "",
    },
    errors: {} as Record<string, string>,
    touched: {} as Record<string, boolean>,
  });

  const dynamicValidators = useMemo(() => {
    const channel = formData.fields.channel as keyof typeof CHANNEL_RULES;
    const rules = CHANNEL_RULES[channel];

    return {
      channel: [valid.required("channel")],
      recipientContactId: [valid.required("recipient contact ID")],
      title: [
        valid.required("title"),
        valid.min(rules.title.min, "title"),
        valid.max(rules.title.max, "title"),
      ],
      content: [
        valid.required("content"),
        valid.min(rules.content.min, "content"),
        valid.max(rules.content.max, "content"),
      ],
    };
  }, [formData.fields.channel]);

  const { isValid: isFormValid } = generateErrors(formData.fields, dynamicValidators);

  const channelOptions = [
    { value: NotificationChannel.EMAIL, label: "Email" },
    { value: NotificationChannel.SMS, label: "SMS" },
    { value: NotificationChannel.PUSH, label: "Push Notification" },
  ];

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newFields = { ...formData.fields, [name]: value };

    const { errors } = generateErrors(newFields, dynamicValidators);

    setFormData((prev) => ({
      ...prev,
      fields: newFields,
      errors: errors,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  // const isFormValid =
  //   Object.values(formData.fields).every((val) => val !== "") &&
  //   Object.values(formData.errors).every((err) => err === "");

  return { channelOptions, handleChange, formData, isFormValid, validators: dynamicValidators };
};
