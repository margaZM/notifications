import { CreateNotificationButton } from "@/src/modules/notifications/components/CreateNotificationButton";
import { useDashboardStore } from "@/src/shared/stores/dashboardStore";
import { Layers } from "lucide-react";

export const HeaderNotifications = () => {
  const activeTab = useDashboardStore((state) => state.activeTab);

  return (
    <>
      {activeTab === "notifications" && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            <Layers className="text-primary-default" size={20} />
            Recent Notifications
          </h2>
          <CreateNotificationButton />
        </div>
      )}
    </>
  );
};
