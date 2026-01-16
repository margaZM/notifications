import { ContactList } from "./components/ContactList";
import { useContactsStore } from "./stores/contactsStore";

export const ContactViewMain = () => {
  const contacts = useContactsStore((state) => state.contacts);

  return <ContactList contacts={contacts} />;
};
