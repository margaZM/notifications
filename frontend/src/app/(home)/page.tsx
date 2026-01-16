"use client";
import { ContactViewMain } from "@/src/modules/contacts/Main";
import { DashboardLayout } from "@/src/shared/components/layouts/DashboardLayout/DashboardLayout";
import { SubHeaderDashboardLayout } from "@/src/shared/components/layouts/SubHeaderDashboardLayout/SubHeaderDasboardLayout";
import { NotificationViewMain } from "@/src/modules/notifications/Main";
import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { TabTypeDashboard } from "@/src/shared/constants/dashboard/index";
export default function HomePage() {
  const activeTab = useDashboardStore((state) => state.activeTab);
  const ActiveView =
    activeTab === TabTypeDashboard.CONTACTS ? ContactViewMain : NotificationViewMain;

  return (
    <DashboardLayout>
      <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 max-w-lg mx-auto">
        <SubHeaderDashboardLayout />
        <ActiveView />
      </section>
    </DashboardLayout>
  );
}
