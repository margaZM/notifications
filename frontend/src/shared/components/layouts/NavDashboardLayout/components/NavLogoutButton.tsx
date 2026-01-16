import { LogOut } from "lucide-react";

export const NavLogoutButton = () => {
  return (
    <button className="text-slate-400 hover:text-red-500 transition-colors">
      <LogOut size={20} />
    </button>
  );
};
