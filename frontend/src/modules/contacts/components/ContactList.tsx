"use client";
import { ContactCard } from "@/src/modules/contacts/components/ContactCard";
import { Contact } from "@/src/core/contacts/domain/models/Contact";

export const ContactList = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <div className="space-y-4 mt-4">
      {contacts.map((contact) => (
        <ContactCard key={contact.contactId} item={contact} />
      ))}
    </div>
  );
};
