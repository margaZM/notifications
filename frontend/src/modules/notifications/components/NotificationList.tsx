"use client";
import { NotificationCard } from "@/src/modules/notifications/components/NotificationCard/NotificationCard";
import { Notification } from "@/src/core/notifications/domain/models/Notification";

export const NotificationList = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <div className="space-y-4 mt-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.notificationId} item={notification} />
      ))}
    </div>
  );
};
