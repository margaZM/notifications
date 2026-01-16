import { NavDashboardLayout } from "../NavDashboardLayout/NavDashboardLayout";
import { FooterDashboardLayout } from "./components/FooterDashboardLayout";
import { MainDashboardLayout } from "../MainDashboardLayout/MainDashboardLayout";
import { AuthenticationDashboardLayout } from "./components/AuthenticationDashboardLayout";
import { ReactNode } from "react";
export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthenticationDashboardLayout>
      <div className="min-h-[95vh]">
        <NavDashboardLayout />
        <MainDashboardLayout>{children}</MainDashboardLayout>
      </div>
      <FooterDashboardLayout />
    </AuthenticationDashboardLayout>
  );
};
