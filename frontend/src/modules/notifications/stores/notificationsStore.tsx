import { Contact } from "@/src/core/contacts/domain/models/Contact";
import { Notification } from "@/src/core/notifications/domain/models/Notification";
import { create } from "zustand";

interface NotificationsState {
  notifications: Notification[];
}

interface NotificationsActions {
  setNotifications: (notifications: Notification[]) => void;
}

const initialState: NotificationsState = {
  notifications: [],
};

export const useNotificationsStore = create<NotificationsState & NotificationsActions>((set) => ({
  ...initialState,
  setNotifications: (notifications) => set({ notifications }),
}));
