import { useEffect, useMemo, useRef } from "react";
import { Switch } from "../../../../ui/Switch";
import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { useNotification } from "@/src/shared/hooks/useNotification";
import { ContactRepository } from "@/src/core/contacts/infrastructure/repositories/HttpContactRepository";
import { GetAllContactsUseCase } from "@/src/core/contacts/application/use-cases/GetAllContacts";
import { NotificationRepository } from "@/src/core/notifications/infrastructure/repositories/HttpNotificationRepository";
import { GetAllNotificationsUseCase } from "@/src/core/notifications/application/use-cases/GetAllNotifications";
import { useContactsStore } from "@/src/modules/contacts/stores/contactsStore";
import { useNotificationsStore } from "@/src/modules/notifications/stores/notificationsStore";
import { ToastNotification } from "@/src/shared/components/ui/ToastNotification";

export const SwitchDasboardLayout = () => {
  const { setActiveTab, activeTab } = useDashboardStore((state) => state);
  const setNotifications = useNotificationsStore((state) => state.setNotifications);
  const setContacts = useContactsStore((state) => state.setContacts);

  const isFetching = useRef(false);

  const { notification, showNotification, closeNotification } = useNotification();

  const getAllContactsUseCase = useMemo(() => {
    const apiService = new ApiService();
    const contactRepository = new ContactRepository(apiService);
    return new GetAllContactsUseCase(contactRepository);
  }, []);

  const getAllNotificationsUseCase = useMemo(() => {
    const apiService = new ApiService();
    const notificationRepository = new NotificationRepository(apiService);
    return new GetAllNotificationsUseCase(notificationRepository);
  }, []);

  const handleGetNotifications = async () => {
    if (isFetching.current) return;
    try {
      isFetching.current = true;
      const notificationList = await getAllNotificationsUseCase.execute();
      setNotifications(notificationList);
    } catch (error: any) {
      console.log(error);
      showNotification(error.message, "error");
    } finally {
      isFetching.current = false;
    }
  };

  const handleGetContacts = async () => {
    if (isFetching.current) return;
    try {
      isFetching.current = true;
      const contactList = await getAllContactsUseCase.execute();
      setContacts(contactList);
    } catch (error: any) {
      console.log(error);
      showNotification(error.message, "error");
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    if (activeTab === "notifications") {
      handleGetNotifications();
    } else if (activeTab === "contacts") {
      handleGetContacts();
    }
  }, [activeTab]);

  const tabs = {
    principal: {
      label: "Notifications",
      id: "notifications",
      onClick: () => setActiveTab("notifications"),
      active: activeTab === "notifications",
    },
    secondary: {
      label: "Contacts",
      id: "contacts",
      onClick: () => setActiveTab("contacts"),
      active: activeTab === "contacts",
    },
  };

  return (
    <div>
      {notification.isOpen && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <Switch tabs={tabs} />
    </div>
  );
};
