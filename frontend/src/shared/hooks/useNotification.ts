"use client";
import { useCallback, useState } from "react";

export type NotificationType = "success" | "error" | "info" | "warning";

export enum NotificationIcon {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    message: string;
    type: NotificationType;
  }>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showNotification = useCallback((message: string, type: NotificationType = "info") => {
    setNotification({ isOpen: true, message, type });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { notification, showNotification, closeNotification };
};
