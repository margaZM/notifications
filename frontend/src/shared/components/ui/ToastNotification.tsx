"use client";
import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { NotificationType } from "@/src/shared/hooks/useNotification";

interface ToastNotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification = ({
  message,
  type,
  onClose,
  duration = 4000,
}: ToastNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: "bg-emerald-500 border-emerald-400 text-white",
    error: "bg-rose-500 border-rose-400 text-white",
    info: "bg-blue-500 border-blue-400 text-white",
    warning: "bg-amber-500 border-amber-400 text-white",
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  console.log(message, "message toast");

  return (
    <div
      className={`fixed top-6 right-6 z-200 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right-10 duration-300 ${styles[type]}`}
    >
      {icons[type]}
      <p className="font-medium text-sm leading-tight max-w-60">{message}</p>
      <button onClick={onClose} className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
