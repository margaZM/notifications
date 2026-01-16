import { DeleteNotificationUseCase } from "@/src/core/notifications/application/use-cases/DeleteNotification";
import { NotificationRepository } from "@/src/core/notifications/infrastructure/repositories/HttpNotificationRepository";
import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { useNotification } from "@/src/shared/hooks/useNotification";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { ToastNotification } from "@/src/shared/components/ui/ToastNotification";
import { useNotificationsStore } from "../../../stores/notificationsStore";

export const DeleteNotificationButton = ({ notificationId }: { notificationId: string }) => {
  const { notification, showNotification, closeNotification } = useNotification();
  const { notifications, setNotifications } = useNotificationsStore();

  const deleteNotificationUseCase = useMemo(() => {
    const apiService = new ApiService();
    const notificationRepository = new NotificationRepository(apiService);
    return new DeleteNotificationUseCase(notificationRepository);
  }, []);

  const handleDeleteNotification = async () => {
    try {
      await deleteNotificationUseCase.execute(notificationId);
      showNotification("Notification deleted successfully.", "success");
      updateNotificationsInStore(notificationId);
    } catch (error: any) {
      console.log(error);
      showNotification(error.message, "error");
    }
  };

  const updateNotificationsInStore = (newNotificationId: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.notificationId !== newNotificationId,
    );
    setNotifications(updatedNotifications);
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
      <button
        onClick={handleDeleteNotification}
        className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-100"
      >
        <Trash2 size={18} />
      </button>
    </>
  );
};
