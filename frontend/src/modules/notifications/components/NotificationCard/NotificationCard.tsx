import { DeleteNotificationButton } from "./components/DeleteNotificationButton";
import { UpdateNotificationButton } from "./components/UpdateNotificationButton";
import { Notification } from "@/src/core/notifications/domain/models/Notification";

interface NotificationCardProps {
  item: Notification;
}

export const NotificationCard = ({ item }: NotificationCardProps) => {
  return (
    <div
      key={item.notificationId}
      className="flex items-center justify-between px-4 py-1 shadow-sm rounded-2xl bg-gray-light transition-colors border border-transparent hover:border-gray-100 group"
    >
      <div>
        <p className="font-bold text-slate-800">{item.title}</p>
        <p className="font-medium text-slate-600 truncate">{item.content}</p>
        <div className="flex gap-8">
          <p className="text-xs text-slate-800 bg-primary-light rounded-md px-1">{item.channel}</p>
          <p className="text-xs text-slate-500 uppercase">{item.status}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <DeleteNotificationButton notificationId={item.notificationId} />
        <UpdateNotificationButton selectedItem={item} />
      </div>
    </div>
  );
};
