import { NotificationList } from "./components/NotificationList";
import { useNotificationsStore } from "./stores/notificationsStore";

export const NotificationViewMain = () => {
  const notifications = useNotificationsStore((state) => state.notifications);

  console.log(notifications);

  return <NotificationList notifications={notifications} />;
};
