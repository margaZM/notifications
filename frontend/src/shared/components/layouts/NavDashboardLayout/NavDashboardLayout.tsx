"use client";
import { LogOut, User2Icon } from "lucide-react";
import { NavLogo } from "./components/NavLogo";
import { NavRegisterContactButton } from "./components/NavRegisterContactButton";
import { NavLogoutButton } from "./components/NavLogoutButton";
import { NavUser } from "./components/NavUser";
export const NavDashboardLayout = () => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <NavLogo />
        <div className="flex items-center gap-4">
          <NavRegisterContactButton />
          <div className="h-8 w-px bg-slate-100 mx-2"></div>
          <div className="flex items-center gap-3">
            <NavUser />
            <NavLogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
