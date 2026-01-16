import { ReactNode } from "react";
import { HeaderDashboardLayout } from "./HeaderDashboardLayout/HeaderDashboardLayout";
interface HeaderDashboardLayoutProps {
  children: ReactNode;
}
export const MainDashboardLayout = ({ children }: HeaderDashboardLayoutProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <HeaderDashboardLayout />
      {children}
    </main>
  );
};
