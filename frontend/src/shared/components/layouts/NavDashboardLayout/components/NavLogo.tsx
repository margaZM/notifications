import { Bell } from "lucide-react";

export const NavLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary-default p-2.5 rounded-2xl text-white shadow-lg shadow-gray-200">
        <Bell size={24} />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
        Notify<span className="text-primary-default underline decoration-2">Manager</span>
      </span>
    </div>
  );
};
