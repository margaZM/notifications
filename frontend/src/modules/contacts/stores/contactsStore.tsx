import { Contact } from "@/src/core/contacts/domain/models/Contact";
import { create } from "zustand";

interface ContactsState {
  contacts: Contact[];
}

interface ContactsActions {
  setContacts: (contacts: Contact[]) => void;
}

const initialState: ContactsState = {
  contacts: [],
};

export const useContactsStore = create<ContactsState & ContactsActions>((set) => ({
  ...initialState,
  setContacts: (contacts) => set({ contacts }),
}));
