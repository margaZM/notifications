import { create } from "zustand";

interface ModalState {
  createEditNotification: boolean;
  createContact: boolean;
  notificationDetail: boolean;
}

interface ModalActions {
  openModal: (modalName: ModalName) => void;
  closeModal: (modalName: ModalName) => void;
}

type ModalName = keyof ModalState;

const initialState: ModalState = {
  createEditNotification: false,
  createContact: false,
  notificationDetail: false,
};

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  ...initialState,
  openModal: (modalName) =>
    set({
      ...initialState,
      [modalName]: true,
    }),
  closeModal: (modalName) =>
    set((state) => ({
      [modalName]: false,
    })),
}));
