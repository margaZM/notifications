import { useAuthStore } from "@/src/shared/stores/useAuthStore";
import { User2Icon } from "lucide-react";

export const NavUser = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  const userEmail = user.email;

  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "";

  return (
    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-primary-default">
      {initials ? initials : <User2Icon size={20} />}
    </div>
  );
};
