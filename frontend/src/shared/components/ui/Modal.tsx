import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-lg">{title || "Notification Detail"}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
