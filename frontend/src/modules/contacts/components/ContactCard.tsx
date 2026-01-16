import { Mail, Trash2, SmartphoneIcon, MessageCircle, Copy } from "lucide-react";

interface CardProps {
  item: {
    contactId: string;
    email: string;
    phoneNumber: string;
    deviceToken: string;
  };
}

export const ContactCard = ({ item }: CardProps) => {
  const copyContact = () => {
    navigator.clipboard.writeText(item.contactId);
  };

  return (
    <div
      key={item.contactId}
      className="flex items-center justify-between px-2 py-2 shadow-sm rounded-2xl bg-gray-light transition-colors border border-transparent hover:border-gray-100 group"
    >
      <div className="max-w-xs overflow-hidden">
        <div className="flex items-center gap-2 font-medium text-slate-800">
          <Mail size={16} />
          <p>{item.email}</p>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <MessageCircle size={16} />
          <p>{item.phoneNumber}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 ">
          <SmartphoneIcon size={16} />
          <p className="truncate">{item.deviceToken}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={copyContact}
          className="cursor-pointer p-2 text-slate-300 hover:text-gray-500 transition-colors opacity-100"
        >
          <Copy size={18} />
        </button>
        <button className="cursor-pointer p-2 text-gray-300 hover:text-red-500 transition-colors opacity-100">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
